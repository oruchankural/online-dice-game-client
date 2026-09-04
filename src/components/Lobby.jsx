import React, { useState } from 'react';
import Button from './Button';
import '../componentStyles/Lobby.css';

function Lobby({ onCreateRoom, onJoinRoom }) {
    const [mode, setMode] = useState('choice');
    const [playerName, setPlayerName] = useState('');
    const [diceCount, setDiceCount] = useState(4);
    const [rounds, setRounds] = useState(3);
    const [roomCode, setRoomCode] = useState('');

    const handleCreate = (e) => {
        e.preventDefault();
        if (!playerName.trim()) return;
        onCreateRoom({ playerName: playerName.trim(), diceCount, rounds });
    };

    const handleJoin = (e) => {
        e.preventDefault();
        if (!playerName.trim() || !roomCode.trim()) return;
        onJoinRoom({ roomCode: roomCode.trim().toUpperCase(), playerName: playerName.trim(), diceCount });
    };

    return (
        <div className="lobby-box">
            <h1>🎲 Online Zarlar</h1>

            {mode === 'choice' && (
                <div className="lobby-actions">
                    <Button text="Oda Oluştur" onClick={() => setMode('create')} />
                    <Button text="Odaya Katıl" onClick={() => setMode('join')} />
                </div>
            )}

            {mode === 'create' && (
                <form onSubmit={handleCreate} className="lobby-form">
                    <h3>Yeni Oda Oluştur</h3>
                    <input
                        type="text"
                        placeholder="Oyuncu Adınız"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        required
                    />
                    <label>Zar Sayısı:</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={diceCount}
                        onChange={(e) => setDiceCount(e.target.value)}
                    />
                    <label>Tur (Round) Sayısı:</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={rounds}
                        onChange={(e) => setRounds(e.target.value)}
                    />
                    <Button text="Odayı Başlat" type="submit" />
                    <button type="button" className="back-btn" onClick={() => setMode('choice')}>Geri</button>
                </form>
            )}

            {mode === 'join' && (
                <form onSubmit={handleJoin} className="lobby-form">
                    <h3>Odaya Katıl</h3>
                    <input
                        type="text"
                        placeholder="Oda Kodu (örn: X7A9B)"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Oyuncu Adınız"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        required
                    />
                    <label>Zar Sayınız:</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={diceCount}
                        onChange={(e) => setDiceCount(e.target.value)}
                    />
                    <Button text="Odaya Giriş Yap" type="submit" />
                    <button type="button" className="back-btn" onClick={() => setMode('choice')}>Geri</button>
                </form>
            )}
        </div>
    );
}

export default Lobby;