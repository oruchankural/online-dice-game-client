import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Lobby from '../Lobby.jsx';

describe('Lobby Entegrasyon Testleri', () => {
    const mockCreateRoom = jest.fn();
    const mockJoinRoom = jest.fn();
    const mockClearError = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Error Badge prop varlığında render edilmeli', () => {
        render(
            <Lobby
                onCreateRoom={mockCreateRoom}
                onJoinRoom={mockJoinRoom}
                errorMessage="Oda dolu veya bulunamadı!"
                onClearError={mockClearError}
            />
        );

        expect(screen.getByText(/Oda dolu veya bulunamadı!/i)).toBeInTheDocument();
    });

    test('Mod değişikliklerinde onClearError callback-i tetiklenmeli', () => {
        render(
            <Lobby
                onCreateRoom={mockCreateRoom}
                onJoinRoom={mockJoinRoom}
                errorMessage="Bir hata oluştu"
                onClearError={mockClearError}
            />
        );

        fireEvent.click(screen.getByText('Odaya Katıl'));
        expect(mockClearError).toHaveBeenCalledTimes(1);
    });

    test('Choice -> CreateForm -> Choice geçiş akışı (Geri butonu entegrasyonu)', () => {
        render(
            <Lobby
                onCreateRoom={mockCreateRoom}
                onJoinRoom={mockJoinRoom}
                errorMessage=""
                onClearError={mockClearError}
            />
        );
        fireEvent.click(screen.getByText('Oda Oluştur'));
        expect(screen.getByText('Yeni Oda Oluştur')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Geri'));
        expect(screen.getByText('Oda Oluştur')).toBeInTheDocument();
        expect(screen.getByText('Odaya Katıl')).toBeInTheDocument();
    });

    test('Alt form submit edildiğinde ilgili parent callback tetiklenmeli', () => {
        render(
            <Lobby
                onCreateRoom={mockCreateRoom}
                onJoinRoom={mockJoinRoom}
                errorMessage=""
                onClearError={mockClearError}
            />
        );

        fireEvent.click(screen.getByText('Oda Oluştur'));

        const nameInput = screen.getByPlaceholderText('Oyuncu Adınız');
        fireEvent.change(nameInput, { target: { value: 'Kemal' } });

        fireEvent.click(screen.getByText('Odayı Başlat'));

        expect(mockCreateRoom).toHaveBeenCalledTimes(1);
        expect(mockCreateRoom).toHaveBeenCalledWith(
            expect.objectContaining({ playerName: 'Kemal' })
        );
    });
});