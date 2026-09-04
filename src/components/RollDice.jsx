import React from 'react';
import Lobby from './Lobby';
import Die from './Die';
import Button from './Button';
import {useDiceGame} from '../hooks/useDiceGame';
import {socket} from '../socket';

function RollDice() {
    const {
        roomData,
        lastRollData,
        errorMessage,
        clearErrorMessage,
        createRoom,
        joinRoom,
        startGame,
        rollDice
    } = useDiceGame();

    if (!roomData) {
        return <Lobby
                    onCreateRoom={createRoom}
                    onJoinRoom={joinRoom}
                    errorMessage={errorMessage}
                    onClearError={clearErrorMessage}/>
    }
    if (roomData.isGameOver) {
        const winner = [...roomData.players].sort((a, b) => b.totalScore - a.totalScore)[0];
        return (
            <div className="game-over-container">
                <h1>OYUN BİTTİ!</h1>
                <h2>Kazanan: <span className="highlight">{winner.name}</span></h2>
                <p>Genel Ortalama Skoru: <strong>{winner.totalScore}</strong></p>
                <button onClick={() => window.location.reload()}>Yeni Oyun Başlat / Katıl</button>
            </div>
        );
    }
    if (roomData.isGameStarted) {
        const currentPlayer = roomData.players[roomData.activePlayerIndex];
        const isMyTurn = socket.id === currentPlayer.id;

        return (
            <div className="RollDice-wrapper">
                <div className="game-screen">
                    <div className="game-header">
                        <h2>Oda Kodu: {roomData.code}</h2>
                        <h3>Round {roomData.currentRound} / {roomData.totalRounds}</h3>
                        <h3>Sıra: <span className="highlight">{currentPlayer?.name}</span> {isMyTurn && '(SENSİN!)'}
                        </h3>
                    </div>

                    <div className={`players-grid count-${roomData.players.length}`}>
                        {roomData.players.map((player, index) => {
                            const isActive = index === roomData.activePlayerIndex;
                            return (
                                <div key={player.id} className={`player-card ${isActive ? 'active-card' : ''}`}>
                                    <h3>{player.name} {player.isHost && '👑'}</h3>
                                    <p>Zar Sayısı: {player.diceCount}</p>
                                    <p>Ortalama Skor: <strong>{player.totalScore || '-'}</strong></p>

                                    {/* Sırası gelen oyuncuda zarlar ve buton görünür */}
                                    {isActive && (
                                        <div className="active-dice-area">
                                            {lastRollData && (
                                                <div className="RollDice-container">
                                                    {lastRollData.dice.map((face, idx) => (
                                                        <Die key={idx} face={face}/>
                                                    ))}
                                                </div>
                                            )}

                                            {isMyTurn ? (
                                                <Button text="🎲 Zarları At!" onClick={rollDice}/>
                                            ) : (
                                                <p className="waiting-msg">Oyuncunun atması bekleniyor...</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="RollDice-wrapper">
            <div className="waiting-room">
                <h2>Oda Kodu: <span className="highlight-code">{roomData.code}</span></h2>
                <p>Arkadaşlarınla paylaşarak odaya katılmalarını sağla!</p>
                <h3>Odadaki Oyuncular ({roomData.players.length}):</h3>
                <ul className="players-waiting-list">
                    {roomData.players.map((p) => (
                        <li key={p.id}>👤 <strong>{p.name}</strong> ({p.diceCount} Zar)</li>
                    ))}
                </ul>
                {socket.id === roomData.players[0]?.id && (
                    <>
                        <Button
                            text={roomData.players.length < 2 ? 'En Az 2 Oyuncu Bekleniyor...' : '🎮 Oyunu Başlat!'}
                            onClick={startGame}
                            disabled={roomData.players.length < 2}
                        />
                        <Button
                            text="Odayı Terket"
                            onClick={() => window.location.reload()}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default RollDice;