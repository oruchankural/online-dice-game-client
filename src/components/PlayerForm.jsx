import React, { useState } from 'react';
import Button from './Button';
import { DiceConstants } from '../constants/DiceConstants';

function PlayerForm({ onAddPlayer }) {
    const [name, setName] = useState('');
    const [diceCount, setDiceCount] = useState(DiceConstants.DEFAULT_NUM_DICE);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAddPlayer(name.trim(), diceCount);
        setName('');
    };
    return (
        <form onSubmit={handleSubmit} className="form">
            <input
                className="form-input"
                type="text"
                placeholder="Oyuncu Adı"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="form-input"
                type="number"
                min="1"
                max="10"
                value={diceCount}
                onChange={(e) => setDiceCount(Number(e.target.value))}
            />
            <Button className="form-submit-button" text="Oyuncu Ekle" type="submit" />
        </form>
    );
}
export default PlayerForm;