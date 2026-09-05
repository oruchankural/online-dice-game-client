import React, { useState } from 'react';
import Button from './Button';

function JoinRoomForm({ onSubmit, onBack }) {
    const [formData, setFormData] = useState({ roomCode: '', playerName: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { roomCode, playerName } = formData;
        if (!playerName.trim() || !roomCode.trim()) return;

        onSubmit({
            roomCode: roomCode.trim().toUpperCase(),
            playerName: playerName.trim()
        });
    };

    return (
        <form onSubmit={handleSubmit} className="lobby-form">
            <h3>Odaya Katıl</h3>
            <input
                type="text"
                name="roomCode"
                placeholder="Oda Kodu (örn: X7A9B)"
                value={formData.roomCode}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="playerName"
                placeholder="Oyuncu Adınız"
                value={formData.playerName}
                onChange={handleChange}
                required
            />
            <Button text="Odaya Giriş Yap" testId="join-room-btn" type="submit" />
            <button type="button" className="back-btn" onClick={onBack}>Geri</button>
        </form>
    );
}

export default JoinRoomForm;