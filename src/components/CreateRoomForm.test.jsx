import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateRoomForm from './CreateRoomForm';

describe('CreateRoomForm Testleri', () => {
    const mockOnSubmit = jest.fn();
    const mockOnBack = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Boş oyuncu adı ile form gönderildiğinde hata göstermeli ve onSubmit çağrılmamalı', async () => {
        render(<CreateRoomForm onSubmit={mockOnSubmit} onBack={mockOnBack} />);

        const submitBtn = screen.getByText('Odayı Başlat');
        fireEvent.click(submitBtn);

        const errorMessage = await screen.findByTestId('form-error-message');
        expect(errorMessage).toHaveTextContent('Oyuncu adı boş olamaz!');
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test('Zar sayısı 0 veya boş bırakıldığında hata göstermeli ve onSubmit çağrılmamalı', async () => {
        render(<CreateRoomForm onSubmit={mockOnSubmit} onBack={mockOnBack} />);

        const nameInput = screen.getByPlaceholderText('Oyuncu Adınız');
        const diceInput = screen.getByLabelText('Zar Sayısı:');
        const submitBtn = screen.getByText('Odayı Başlat');

        fireEvent.change(nameInput, { target: { value: 'Kemal' } });

        fireEvent.change(diceInput, { target: { value: 0 } });
        fireEvent.click(submitBtn);

        let errorMessage = await screen.findByTestId('form-error-message');
        expect(errorMessage).toHaveTextContent('Zar sayısı 1 ile 10 arasında olmalıdır!');
        expect(mockOnSubmit).not.toHaveBeenCalled();

        fireEvent.change(diceInput, { target: { value: '' } });
        fireEvent.click(submitBtn);

        expect(screen.getByTestId('form-error-message')).toHaveTextContent('Zar sayısı 1 ile 10 arasında olmalıdır!');
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test('Tur sayısı 0 veya boş bırakıldığında hata göstermeli ve onSubmit çağrılmamalı', async () => {
        render(<CreateRoomForm onSubmit={mockOnSubmit} onBack={mockOnBack} />);

        const nameInput = screen.getByPlaceholderText('Oyuncu Adınız');
        const roundsInput = screen.getByLabelText('Tur Sayısı:');
        const submitBtn = screen.getByText('Odayı Başlat');

        fireEvent.change(nameInput, { target: { value: 'Kemal' } });

        fireEvent.change(roundsInput, { target: { value: 0 } });
        fireEvent.click(submitBtn);

        let errorMessage = await screen.findByTestId('form-error-message');
        expect(errorMessage).toHaveTextContent('Tur sayısı 1 ile 10 arasında olmalıdır!');
        expect(mockOnSubmit).not.toHaveBeenCalled();

        fireEvent.change(roundsInput, { target: { value: '' } });
        fireEvent.click(submitBtn);

        expect(screen.getByTestId('form-error-message')).toHaveTextContent('Tur sayısı 1 ile 10 arasında olmalıdır!');
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test('Geçerli bilgiler girildiğinde onSubmit doğru verilerle çağrılmalı', () => {
        render(<CreateRoomForm onSubmit={mockOnSubmit} onBack={mockOnBack} />);

        const nameInput = screen.getByPlaceholderText('Oyuncu Adınız');
        const diceInput = screen.getByLabelText('Zar Sayısı:');
        const roundsInput = screen.getByLabelText('Tur (Round) Sayısı:');
        const submitBtn = screen.getByText('Odayı Başlat');

        fireEvent.change(nameInput, { target: { value: '  Kemal  ' } });
        fireEvent.change(diceInput, { target: { value: 5 } });
        fireEvent.change(roundsInput, { target: { value: 4 } });

        fireEvent.click(submitBtn);

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({
            playerName: 'Kemal',
            diceCount: 5,
            rounds: 4
        });
    });

    test('Geri butonuna tıklandığında onBack fonksiyonu çağrılmalı', () => {
        render(<CreateRoomForm onSubmit={mockOnSubmit} onBack={mockOnBack} />);

        const backBtn = screen.getByText('Geri');
        fireEvent.click(backBtn);

        expect(mockOnBack).toHaveBeenCalledTimes(1);
    });
});