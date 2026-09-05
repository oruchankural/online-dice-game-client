import {useState, useEffect} from 'react';
import {socket} from '../utils/socket.js';

export function useDiceGame() {
    const [roomData, setRoomData] = useState(null);
    const [lastRollData, setLastRollData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const handleError = (message) => {
            console.log("Sunucudan gelen hata:", message);
            setErrorMessage(message);
        };
        socket.on('room_created', ({roomData}) => {
            setErrorMessage(null);
            setRoomData(roomData);
        });
        socket.on('update_room', (updatedRoom) => setRoomData(updatedRoom));
        socket.on('game_started', (updatedRoom) => setRoomData({...updatedRoom}));
        socket.on('dice_rolled', ({room, lastRoll}) => {
            setRoomData({...room});
            setLastRollData(lastRoll);
        });
        socket.on('error_message', handleError);
        return () => {
            socket.off('room_created');
            socket.off('update_room');
            socket.off('game_started');
            socket.off('dice_rolled');
            socket.off('error_message', handleError);
        };
    }, []);
    const ensureConnected = () => {
        if (!socket.connected) {
            socket.connect();
        }
    };
    const createRoom = (data) => {
        ensureConnected();
        setErrorMessage('');
        socket.emit('create_room', data);
    };
    const joinRoom = (data) => {
        ensureConnected();
        setErrorMessage('');
        socket.emit('join_room', data);
    };
    const startGame = () => {
        if(roomData){
            socket.emit('start_game', {roomCode: roomData.code});
        }
    }
    const rollDice = () => {
        if (roomData) {
            socket.emit('roll_dice', {roomCode: roomData.code});
        }
    };
    const resetGame = () => {
        if (roomData?.code) {
            socket.emit('leave_room', { roomCode: roomData.code });
        }
        setRoomData(null);
        setLastRollData(null);
        setErrorMessage('');
    };
    const clearErrorMessage = () => setErrorMessage(null);

    return {
        roomData,
        lastRollData,
        errorMessage,
        clearErrorMessage,
        createRoom,
        joinRoom,
        startGame,
        rollDice,
        resetGame
    };
}