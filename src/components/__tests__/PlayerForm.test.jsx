// @jest-environment jsdom
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerForm from '../PlayerForm.jsx';
import { DiceConstants } from '../../constants/DiceConstants.js';

describe('PlayerForm Bileşeni Testleri', () => {
    const mockOnAddPlayer = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Input alanları ve buton sorunsuz render olmalı', () => {
        render(<PlayerForm onAddPlayer={mockOnAddPlayer} />);

        const nameInput = screen.getByPlaceholderText('Oyuncu Adı');
        const diceInput = screen.getByRole('spinbutton');
        const submitButton = screen.getByText('Oyuncu Ekle');

        expect(nameInput).toBeInTheDocument();
        expect(diceInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(diceInput.value).toBe(String(DiceConstants.DEFAULT_NUM_DICE));
    });

    test('Boş isimle form gönderildiğinde onAddPlayer çağrılmamalı', () => {
        render(<PlayerForm onAddPlayer={mockOnAddPlayer} />);

        const submitButton = screen.getByText('Oyuncu Ekle');
        fireEvent.click(submitButton);
        expect(mockOnAddPlayer).not.toHaveBeenCalled();
    });

    test('Geçerli veriler girilip form gönderildiğinde onAddPlayer çağrılmalı ve isim inputu temizlenmeli', () => {
        render(<PlayerForm onAddPlayer={mockOnAddPlayer} />);

        const nameInput = screen.getByPlaceholderText('Oyuncu Adı');
        const diceInput = screen.getByRole('spinbutton');
        const submitButton = screen.getByText('Oyuncu Ekle');

        fireEvent.change(nameInput, { target: { value: 'Caner' } });
        fireEvent.change(diceInput, { target: { value: 5 } });

        fireEvent.click(submitButton);

        expect(mockOnAddPlayer).toHaveBeenCalledTimes(1);
        expect(mockOnAddPlayer).toHaveBeenCalledWith('Caner', 5);
        expect(nameInput.value).toBe('');
    });
});