export const mockSocket = {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
};

jest.mock('../utils/socket.js', () => ({
    socket: mockSocket,
}));