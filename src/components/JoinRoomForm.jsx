import React, { useState } from 'react';
import Button from './Button';

function JoinRoomForm({ onSubmit, onBack }) {
    const [formData, setFormData] = useState({ roomCode: '', playerName: '', diceCount: 4 });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { roomCode, playerName } = formData;
        if (!playerName.trim() || !roomCode.trim()) return;

        onSubmit({
            ...formData,
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
            <label htmlFor="joinDiceCount">Zar Sayınız:</label>
            <input
                id="joinDiceCount"
                type="number"
                name="diceCount"
                min="1"
                max="10"
                value={formData.diceCount}
                onChange={handleChange}
            />
            <Button text="Odaya Giriş Yap" type="submit" />
            <button type="button" className="back-btn" onClick={onBack}>Geri</button>
        </form>
    );
}

export default JoinRoomForm;