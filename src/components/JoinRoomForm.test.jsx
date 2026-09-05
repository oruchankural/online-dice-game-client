import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JoinRoomForm from './JoinRoomForm';

describe('JoinRoomForm Testleri', () => {
    const mockOnSubmit = jest.fn();
    const mockOnBack = jest.fn();

    test('Oda kodunu büyük harfe çevirerek submit etmeli', () => {
        render(<JoinRoomForm onSubmit={mockOnSubmit} onBack={mockOnBack} />);

        const codeInput = screen.getByPlaceholderText(/Oda Kodu/i);
        const nameInput = screen.getByPlaceholderText('Oyuncu Adınız');
        const submitBtn = screen.getByText('Odaya Giriş Yap');

        fireEvent.change(codeInput, { target: { value: 'abc12' } });
        fireEvent.change(nameInput, { target: { value: 'Ahmet' } });
        fireEvent.click(submitBtn);

        expect(mockOnSubmit).toHaveBeenCalledWith({
            roomCode: 'ABC12',
            playerName: 'Ahmet',
            diceCount: 4
        });
    });
});