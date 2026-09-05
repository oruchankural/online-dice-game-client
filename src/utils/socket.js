import {io} from 'socket.io-client';

const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

export const socket = io('http://localhost:3001', {
    autoConnect: false,
    reconnectionAttempts:5,
    reconnectionDelay: 1000,
});