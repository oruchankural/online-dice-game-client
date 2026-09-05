import React from 'react';
import Lobby from './Lobby';
import Die from './Die';
import Button from './Button';
import {useDiceGame} from '../hooks/useDiceGame';
import {socket} from '../utils/socket.js';

function RollDice() {
    const {
        roomData,
        errorMessage,
        clearErrorMessage,
        createRoom,
        joinRoom,
        startGame,
        rollDice,
        resetGame
    } = useDiceGame();

    if (!roomData) {
        return (
            <Lobby
                onCreateRoom={createRoom}
                onJoinRoom={joinRoom}
                errorMessage={errorMessage}
                onClearError={clearErrorMessage}
            />
        );
    }


    if (roomData.isGameStarted) {
        const currentPlayer = roomData.players[roomData.activePlayerIndex];
        const isMyTurn = socket.id === currentPlayer.id;
        const winner = roomData.isGameOver
            ? [...roomData.players].sort((a, b) => b.totalScore - a.totalScore)[0]
            : null;

        return (
            <div className="RollDice-wrapper" data-testid="game-screen">
                <div className="game-screen">
                    <div className="game-header">
                        <h2>Oda Kodu: <span data-testid="room-code">{roomData.code}</span></h2>
                        <h3>Round {roomData.currentRound} / {roomData.totalRounds} {roomData.isGameOver ? 'Tamamlandı' : ''}</h3>
                        {!roomData.isGameOver && (
                            <h3>Sıra: <span className="highlight">{currentPlayer?.name}</span> {isMyTurn && '(SENSİN!)'}
                            </h3>
                        )}
                    </div>
                    {roomData.isGameOver && winner && (
                        <div className="game-over-container" data-testid="game-over-screen">
                            <h1>OYUN BİTTİ!</h1>
                            <h2>Kazanan: <span className="highlight" data-testid="winner-name">{winner.name}</span></h2>
                            <p>Genel Ortalama Skoru: <strong>{winner.totalScore}</strong></p>
                            <Button text="Yeni Oyun Başlat / Katıl" onClick={resetGame} id="new-game-btn"
                                    testId="new-game-btn"/>
                        </div>
                    )}
                    <div className={`players-grid count-${roomData.players.length}`}>
                        {roomData.players.map((player, index) => {
                            const isActive = index === roomData.activePlayerIndex;
                            const playerLastRoll = [...(roomData.rolls || [])]
                                .reverse()
                                .find(r => r.playerName === player.name);

                            return (
                                <div key={`${player.id}-${index}`}
                                     className={`player-card ${isActive ? 'active-card' : ''}`}
                                     data-testid={`player-card-${player.name}`}>
                                    <h3>{player.name} {player.isHost && '👑'}</h3>
                                    <p>Zar Sayısı: {player.diceCount}</p>
                                    <p>Ortalama Skor: <strong>{player.totalScore || '-'}</strong></p>

                                    <div className="active-dice-area">
                                        {playerLastRoll && (
                                            <div className="RollDice-container" data-testid="dice-container">
                                                {playerLastRoll.dice.map((face, idx) => (
                                                    <Die key={idx} face={face}/>
                                                ))}
                                            </div>
                                        )}

                                        {isActive && !roomData.isGameOver && (
                                            isMyTurn ? (
                                                <Button text="🎲 Zarları At!" onClick={rollDice} id="roll-dice-btn"
                                                        testId="roll-dice-btn"/>
                                            ) : (
                                                <p className="waiting-msg" data-testid="waiting-msg">Oyuncunun atması
                                                    bekleniyor...</p>
                                            )
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="RollDice-wrapper" data-testid="waiting-room">
            <div className="waiting-room">
                <h2>Oda Kodu: <span className="highlight-code" data-testid="room-code">{roomData.code}</span></h2>
                <p>Arkadaşlarınla paylaşarak odaya katılmalarını sağla!</p>
                <h3>Odadaki Oyuncular ({roomData.players.length}):</h3>
                <ul className="players-waiting-list" data-testid="players-waiting-list">
                    {roomData.players.map((p, index) => (
                        <li key={`${p.id}-${index}`}>👤 <strong>{p.name}</strong> ({p.diceCount} Zar)</li>
                    ))}
                </ul>
                {socket.id === roomData.players[0]?.id && (
                    <>
                        <Button
                            text={roomData.players.length < 2 ? 'En Az 2 Oyuncu Bekleniyor...' : '🎮 Oyunu Başlat!'}
                            onClick={startGame}
                            disabled={roomData.players.length < 2}
                            id="start-game-btn"
                            testId="start-game-btn"
                        />
                        <Button
                            text="Odayı Terket"
                            onClick={resetGame}
                            id="leave-room-btn"
                            testId="leave-room-btn"
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default RollDice;