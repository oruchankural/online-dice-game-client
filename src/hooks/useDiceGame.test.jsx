import { renderHook, act } from '@testing-library/react';
import { useDiceGame } from './useDiceGame';
import { socket } from '../utils/socket.js';

jest.mock('../utils/socket.js', () => ({
    socket: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
        connect: jest.fn(),
        connected: false
    },
}));

describe('useDiceGame Hook Testleri', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('createRoom çağrıldığında socket.emit("create_room") tetiklenmeli', () => {
        const { result } = renderHook(() => useDiceGame());

        act(() => {
            result.current.createRoom({ playerName: 'Ahmet', diceCount: 3 });
        });

        expect(socket.emit).toHaveBeenCalledWith('create_room', {
            playerName: 'Ahmet',
            diceCount: 3,
        });
    });

    test('Sunucudan error_message geldiğinde errorMessage state-i güncellenmeli', () => {
        const socketEvents = {};
        socket.on.mockImplementation((event, callback) => {
            socketEvents[event] = callback;
        });
        const { result } = renderHook(() => useDiceGame());
        act(() => {
            if (socketEvents['error_message']) {
                socketEvents['error_message']('Böyle bir oda bulunamadı!');
            }
        });
        expect(result.current.errorMessage).toBe('Böyle bir oda bulunamadı!');
    });
});