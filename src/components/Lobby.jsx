import React, { useState } from 'react';
import LobbyChoice from './LobbyChoice';
import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';
import {LobbyConstants} from "../constants/LobbyConstants.js";

function Lobby({ onCreateRoom, onJoinRoom, errorMessage, onClearError }) {
    const [mode, setMode] = useState(LobbyConstants.LOBBY_MODES.CHOICE);

    const handleModeChange = (newMode) => {
        onClearError?.();
        setMode(newMode);
    };

    const renderContent = () => {
        switch (mode) {
            case LobbyConstants.LOBBY_MODES.CREATE:
                return (
                    <CreateRoomForm
                        onSubmit={onCreateRoom}
                        onBack={() => handleModeChange(LobbyConstants.LOBBY_MODES.CHOICE)}
                    />
                );
            case LobbyConstants.LOBBY_MODES.JOIN:
                return (
                    <JoinRoomForm
                        onSubmit={onJoinRoom}
                        onBack={() => handleModeChange(LobbyConstants.LOBBY_MODES.CHOICE)}
                    />
                );
            case LobbyConstants.LOBBY_MODES.CHOICE:
            default:
                return <LobbyChoice onSelectMode={handleModeChange} />;
        }
    };

    return (
        <div className="lobby-box">
            <h1>🎲 Online Zarlar</h1>
            {errorMessage && (
                <div className="error-badge">
                    ⚠️ {errorMessage}
                </div>
            )}
            {renderContent()}
        </div>
    );
}

export default Lobby;