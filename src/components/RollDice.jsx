import React from 'react';
import Die from './Die';
import Button from './Button';
import PlayerForm from './PlayerForm';
import { useDiceGame } from '../hooks/useDiceGame';
import '../componentStyles/RollDice.css';

function RollDice() {
    const {
        players,
        currentPlayer,
        activePlayerIndex,
        isGameStarted,
        totalRounds,
        setTotalRounds,
        currentRound,
        isGameOver,
        dice,
        rolling,
        addPlayer,
        removePlayer,
        startGame,
        roll,
        resetGame
    } = useDiceGame();

    const winner = isGameOver
        ? [...players].sort((a, b) => b.totalScore - a.totalScore)[0]
        : null;

    return (
        <div className='RollDice-wrapper'>
            {!isGameStarted ? (
                <div className="lobby-container">
                    <h2>🎮 Oyun Kurulumu</h2>
                    <div className="round-select">
                        <label>Toplam Tur (Round) Sayısı: </label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={totalRounds}
                            onChange={(e) => setTotalRounds(Number(e.target.value))}
                        />
                    </div>
                    <PlayerForm onAddPlayer={addPlayer} />
                    <div className="player-list-lobby">
                        <h3>Eklenen Oyuncular ({players.length}):</h3>
                        <ul>
                            {players.map(p => (
                                <li key={p.id}>
                                    <span>{p.name} ({p.diceCount} Zar)</span>
                                    <button onClick={() => removePlayer(p.id)}>❌ Çıkar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {players.length > 0 && (
                        <Button
                            text="🚀 Oyuna Başla!"
                            onClick={startGame}
                            className="start-game-btn"
                        />
                    )}
                </div>
            ) : isGameOver ? (
                <div className="game-over-container">
                    🏆 <h1>OYUN BİTTİ!</h1>
                    <h2>Kazanan: <span className="highlight">{winner?.name}</span></h2>
                    <p>Genel Ortalama Skoru: <strong>{winner?.totalScore}</strong></p>
                    <Button text="Yeni Oyun Kur" onClick={resetGame} />
                </div>
            ) : (
                <div className="game-screen">
                    <div className="game-header">
                        <h2>Round {currentRound} / {totalRounds}</h2>
                        <h3>Sıra: <span className="highlight">{currentPlayer?.name}</span></h3>
                    </div>
                    <div className={`players-grid count-${players.length}`}>
                        {players.map((player, index) => {
                            const isActive = index === activePlayerIndex;
                            return (
                                <div
                                    key={player.id}
                                    className={`player-card ${isActive ? 'active-card' : ''}`}
                                >
                                    <h3>{player.name}</h3>
                                    <p>Zar Sayısı: {player.diceCount}</p>
                                    <p>Genel Ort.: <strong>{player.totalScore || '-'}</strong></p>
                                    {isActive && (
                                        <div className="active-dice-area">
                                            <div className='RollDice-container'>
                                                {dice.map((face, idx) => (
                                                    <Die key={idx} face={face} rolling={rolling} />
                                                ))}
                                            </div>
                                            <Button
                                                text={rolling ? 'Atılıyor...' : 'Zarları At!'}
                                                onClick={roll}
                                                disabled={rolling}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default RollDice;