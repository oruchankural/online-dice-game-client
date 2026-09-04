import {useState} from 'react';
import {DiceConstants} from '../constants/DiceConstants';
import {calculateTotal, calculateAverage, generateRandomDice} from '../utils/diceUtils';

export function useDiceGame() {
    const [players, setPlayers] = useState([]);
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [totalRounds, setTotalRounds] = useState(DiceConstants.DEFAULT_ROUNDS);
    const [currentRound, setCurrentRound] = useState(1);
    const [isGameOver, setIsGameOver] = useState(false);

    const [dice, setDice] = useState(Array(DiceConstants.DEFAULT_NUM_DICE).fill('one'));
    const [rolling, setRolling] = useState(false);
    const [rollingHistory, setRollingHistory] = useState([]);

    const currentPlayer = players[activePlayerIndex] || null;

    const addPlayer = (name, diceCount) => {
        if (isGameStarted) return;
        const newPlayer = {
            id: Date.now(),
            name,
            diceCount: Number(diceCount) || DiceConstants.DEFAULT_NUM_DICE,
            scores: [],
            totalScore: 0
        };
        setPlayers(prev => [...prev, newPlayer]);
    };

    const removePlayer = (id) => {
        if (isGameStarted) return;
        setPlayers(prev => prev.filter(p => p.id !== id));
    };

    const startGame = () => {
        if (players.length === 0) return;
        setIsGameStarted(true);
        setDice(Array(players[0].diceCount).fill('one'));
    };

    const roll = () => {
        if (!currentPlayer || rolling || isGameOver) return;

        setRolling(true);

        setTimeout(() => {
            const newDice = generateRandomDice(currentPlayer.diceCount);
            const total = calculateTotal(newDice);
            const average = calculateAverage(newDice);

            setDice(newDice);

            setPlayers(prev => prev.map((p, idx) => {
                if (idx === activePlayerIndex) {
                    const newScores = [...p.scores, average];
                    const newTotal = Number((newScores.reduce((a, b) => a + b, 0) / newScores.length).toFixed(2));
                    return {...p, scores: newScores, totalScore: newTotal};
                }
                return p;
            }));

            setRollingHistory(prev => [...prev, {
                playerName: currentPlayer.name,
                dice: newDice,
                round: currentRound,
                total,
                average
            }]);

            const nextIndex = activePlayerIndex + 1;

            if (nextIndex < players.length) {
                setActivePlayerIndex(nextIndex);
                setDice(Array(players[nextIndex].diceCount).fill('one'));
            } else {
                if (currentRound < totalRounds) {
                    setCurrentRound(prev => prev + 1);
                    setActivePlayerIndex(0);
                    setDice(Array(players[0].diceCount).fill('one'));
                } else {
                    setIsGameOver(true);
                }
            }

            setRolling(false);
        }, DiceConstants.ROLLING_TIMEOUT_MS);
    };

    const resetGame = () => {
        setIsGameStarted(false);
        setIsGameOver(false);
        setCurrentRound(1);
        setActivePlayerIndex(0);
        setPlayers([]);
        setRollingHistory([]);
    };

    return {
        players,
        currentPlayer,
        activePlayerIndex,
        isGameStarted,
        totalRounds,
        setTotalRounds,
        currentRound,
        isGameOver,
        dice,
        rolling,
        rollingHistory,
        addPlayer,
        removePlayer,
        startGame,
        roll,
        resetGame
    };
}