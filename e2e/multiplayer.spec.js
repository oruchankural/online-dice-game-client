import { test, expect } from '@playwright/test';

async function createPlayerSession(browser) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:5173');
    return page;
}

async function createRoom(page, { name, diceCount, rounds }) {
    await page.click('text=Oda Oluştur');

    const nameInput = page.locator('input[name="playerName"]');
    await nameInput.clear();
    await nameInput.fill(name);

    const diceInput = page.locator('input[name="diceCount"]');
    await diceInput.clear();
    await diceInput.fill(diceCount.toString());

    const roundsInput = page.locator('input[name="rounds"]');
    await roundsInput.clear();
    await roundsInput.fill(rounds.toString());

    await page.click('[data-testid="start-room-btn"]');

    const roomCodeElement = page.locator('[data-testid="room-code"]');
    await expect(roomCodeElement).toBeVisible();
    return (await roomCodeElement.innerText()).trim();
}

async function joinRoom(page, { name, roomCode }) {
    await page.click('text=Odaya Katıl');
    await page.fill('input[name="playerName"]', name);
    await page.fill('input[name="roomCode"]', roomCode);
    await page.click('[data-testid="join-room-btn"]');
}

async function verifyWaitingRoom(page, expectedPlayerName) {
    await expect(page.locator('[data-testid="players-waiting-list"]'))
        .toContainText(expectedPlayerName, { timeout: 7000 });
}

async function verifyGameOver(pages) {
    for (const page of pages) {
        await expect(page.locator('[data-testid="game-over-screen"]')).toBeVisible({ timeout: 10000 });
    }
}

test.describe('E2E Multiplayer Oyuncu Akışı', () => {
    test('İki oyuncu oda oluşturup katılabilmeli ve zar atıp oyunu bitirebilmeli', async ({ browser }) => {
        const totalRounds = 5;
        const diceCount = 4;

        const hostPage = await createPlayerSession(browser);
        const roomCode = await createRoom(hostPage, { name: 'Kemal (Host)', diceCount, rounds: totalRounds });

        const guestPage = await createPlayerSession(browser);
        await joinRoom(guestPage, { name: 'Oruçhan (Guest)', roomCode });

        await verifyWaitingRoom(hostPage, 'Oruçhan (Guest)');
        await verifyWaitingRoom(guestPage, 'Kemal (Host)');

        const startGameBtn = hostPage.locator('[data-testid="start-game-btn"]');
        await expect(startGameBtn).toBeEnabled();
        await startGameBtn.click();

        await expect(hostPage.locator('[data-testid="game-screen"]')).toBeVisible();
        await expect(guestPage.locator('[data-testid="game-screen"]')).toBeVisible();

        const hostGameOver = hostPage.locator('[data-testid="game-over-screen"]');
        const hostRollBtn = hostPage.locator('[data-testid="roll-dice-btn"]');
        const guestRollBtn = guestPage.locator('[data-testid="roll-dice-btn"]');

        while (!(await hostGameOver.isVisible())) {
            let actionTaken = false;

            if (await hostRollBtn.isVisible()) {
                await hostRollBtn.click({ force: true });
                actionTaken = true;
            } else if (await guestRollBtn.isVisible()) {
                await guestRollBtn.click({ force: true });
                actionTaken = true;
            }

            await hostPage.waitForTimeout(actionTaken ? 800 : 300);
        }

        await verifyGameOver([hostPage, guestPage]);

        await hostPage.click('[data-testid="new-game-btn"]');
        await expect(hostPage.locator('.lobby-box')).toBeVisible();
    });
});