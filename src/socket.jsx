import {io} from 'socket.io-client';

const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
console.log("Socket URL:", socketUrl);
export const socket = io(socketUrl, {
    autoConnect: true
});