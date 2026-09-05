export const mockSocket = {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
};

jest.mock('../socket', () => ({
    socket: mockSocket,
}));