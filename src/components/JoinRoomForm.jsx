import React, {useState} from 'react';
import Button from './Button';

function JoinRoomForm({onSubmit, onBack}) {
    const [formData, setFormData] = useState({roomCode: '', playerName: '',diceCount: 4});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {roomCode, playerName, diceCount} = formData;
        if (!playerName.trim() || !roomCode.trim()) return;

        onSubmit({
            roomCode: roomCode.trim().toUpperCase(),
            playerName: playerName.trim(),
            diceCount: diceCount
        });
    };

    return (
        <form onSubmit={handleSubmit} className="lobby-form">
            <h3>Odaya Katıl</h3>
            <label htmlFor="roomCode">Oda Kodu</label>
            <input
                type="text"
                name="roomCode"
                placeholder="Oda Kodu (örn: X7A9B)"
                value={formData.roomCode}
                onChange={handleChange}
                required
            />
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
            <Button text="Odaya Giriş Yap" testId="join-room-btn" type="submit"/>
            <button type="button" className="back-btn" onClick={onBack}>Geri</button>
        </form>
    );
}

export default JoinRoomForm;