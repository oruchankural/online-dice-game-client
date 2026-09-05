import React, { useState } from 'react';
import Button from './Button';

function CreateRoomForm({ onSubmit, onBack }) {
    const [formData, setFormData] = useState({ playerName: '', diceCount: 4, rounds: 3 });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!formData.playerName.trim()) {
            setErrorMessage("Oyuncu adı boş olamaz!");
            return;
        }

        if (formData.diceCount === '' || formData.diceCount < 1 || formData.diceCount > 10) {
            setErrorMessage("Zar sayısı 1 ile 10 arasında olmalıdır!");
            return;
        }

        if (formData.rounds === '' || formData.rounds < 1 || formData.rounds > 10) {
            setErrorMessage("Tur sayısı 1 ile 10 arasında olmalıdır!");
            return;
        }

        onSubmit({ ...formData, playerName: formData.playerName.trim() });
    };

    return (
        <form onSubmit={handleSubmit} className="lobby-form" noValidate>
            <h3>Yeni Oda Oluştur</h3>
            <label htmlFor="playerName">Oyuncu Adı</label>
            <input
                type="text"
                name="playerName"
                placeholder="Oyuncu Adınız"
                value={formData.playerName}
                onChange={handleChange}
                required
            />
            <label htmlFor="diceCount">Zar Sayısı:</label>
            <input
                id="diceCount"
                type="number"
                name="diceCount"
                min="1"
                max="10"
                value={formData.diceCount}
                onChange={handleChange}
            />
            <label htmlFor="rounds">Tur Sayısı:</label>
            <input
                id="rounds"
                type="number"
                name="rounds"
                min="1"
                max="10"
                value={formData.rounds}
                onChange={handleChange}
            />
            {errorMessage && <p className="error-message" data-testid="form-error-message">{errorMessage}</p>}
            <Button text="Odayı Başlat" id="start-room-btn" testId="start-room-btn" type="submit"/>
            <button type="button" className="back-btn" onClick={onBack}>Geri</button>
        </form>
    );
}

export default CreateRoomForm;