import React from 'react';
import Button from './Button';
import {LobbyConstants} from "../constants/LobbyConstants.js";

function LobbyChoice({ onSelectMode }) {
    return (
        <div className="lobby-actions">
            <Button text="Oda Oluştur" onClick={() => onSelectMode(LobbyConstants.LOBBY_MODES.CREATE)} />
            <Button text="Odaya Katıl" onClick={() => onSelectMode(LobbyConstants.LOBBY_MODES.JOIN)} />
        </div>
    );
}

export default LobbyChoice;