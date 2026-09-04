import { io } from 'socket.io-client';
export const socket = io('https://online-dice-game-server.onrender.com', {
    autoConnect: true
});