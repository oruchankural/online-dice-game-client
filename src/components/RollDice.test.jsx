import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RollDice from './RollDice';
import { useDiceGame } from '../hooks/useDiceGame';
import { socket } from '../socket';

jest.mock('../hooks/useDiceGame');
jest.mock('../socket', () => ({
    socket: { id: 'player-1' }
}));

describe('RollDice Bileşeni Testleri', () => {
    const mockStartGame = jest.fn();
    const mockRollDice = jest.fn();
    const mockCreateRoom = jest.fn();
    const mockJoinRoom = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('roomData yokken Lobby bileşeni gösterilmeli', () => {
        useDiceGame.mockReturnValue({
            roomData: null,
            errorMessage: '',
            createRoom: mockCreateRoom,
            joinRoom: mockJoinRoom,
        });

        render(<RollDice />);
        expect(screen.getByText(/Oda Oluştur/i)).toBeInTheDocument();
    });

    test('Oda kurulduğunda bekleme odası (Waiting Room) görünmeli', () => {
        useDiceGame.mockReturnValue({
            roomData: {
                code: 'ROOM123',
                isGameStarted: false,
                isGameOver: false,
                players: [{ id: 'player-1', name: 'Kemal', diceCount: 3 }]
            },
            startGame: mockStartGame
        });

        render(<RollDice />);

        expect(screen.getByText(/ROOM123/i)).toBeInTheDocument();
        expect(screen.getByText(/Kemal/i)).toBeInTheDocument();

        const startBtn = screen.getByText(/En Az 2 Oyuncu Bekleniyor/i);
        expect(startBtn).toBeDisabled();
    });

    test('Oyun başladığında ve sıra oyuncudayken Zar At butonu görünmeli ve tıklanabilmeli', () => {
        useDiceGame.mockReturnValue({
            roomData: {
                code: 'ROOM123',
                isGameStarted: true,
                isGameOver: false,
                currentRound: 1,
                totalRounds: 3,
                activePlayerIndex: 0,
                players: [
                    { id: 'player-1', name: 'Kemal', diceCount: 2, totalScore: 4 },
                    { id: 'player-2', name: 'Ahmet', diceCount: 2, totalScore: 3 }
                ]
            },
            lastRollData: { dice: ['one', 'six'] },
            rollDice: mockRollDice
        });

        render(<RollDice />);
        expect(screen.getByText(/(SENSİN!)/i)).toBeInTheDocument();

        const rollBtn = screen.getByText(/🎲 Zarları At!/i);
        fireEvent.click(rollBtn);

        expect(mockRollDice).toHaveBeenCalledTimes(1);
    });

    test('Oyun bittiğinde Kazanan ekranı gösterilmeli', () => {
        useDiceGame.mockReturnValue({
            roomData: {
                isGameOver: true,
                players: [
                    { id: 'player-1', name: 'Kemal', totalScore: 12 },
                    { id: 'player-2', name: 'Ahmet', totalScore: 18 }
                ]
            }
        });

        render(<RollDice />);

        expect(screen.getByText(/OYUN BİTTİ!/i)).toBeInTheDocument();
        expect(screen.getByText(/Ahmet/i)).toBeInTheDocument();
    });
});