import { useState, useEffect } from 'react';
import { socket } from '../socket';

export function useDiceGame() {
    const [roomData, setRoomData] = useState(null);
    const [lastRollData, setLastRollData] = useState(null);

    useEffect(() => {
        socket.on('room_created', ({ roomData }) => setRoomData(roomData));
        socket.on('update_room', (updatedRoom) => setRoomData(updatedRoom));
        socket.on('game_started', (updatedRoom) => setRoomData({ ...updatedRoom }));
        socket.on('dice_rolled', ({ room, lastRoll }) => {
            setRoomData({ ...room });
            setLastRollData(lastRoll);
        });

        return () => {
            socket.off('room_created');
            socket.off('update_room');
            socket.off('game_started');
            socket.off('dice_rolled');
        };
    }, []);

    const createRoom = (data) => socket.emit('create_room', data);
    const joinRoom = (data) => socket.emit('join_room', data);
    const startGame = () => roomData && socket.emit('start_game', { roomCode: roomData.code });
    const rollDice = () => {
        if (roomData) {
            socket.emit('roll_dice', { roomCode: roomData.code });
        }
    };
    return {
        roomData,
        lastRollData,
        createRoom,
        joinRoom,
        startGame,
        rollDice
    };
}