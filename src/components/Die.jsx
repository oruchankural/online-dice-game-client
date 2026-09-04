import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDiceOne,
    faDiceTwo,
    faDiceThree,
    faDiceFour,
    faDiceFive,
    faDiceSix
} from '@fortawesome/free-solid-svg-icons';

const DICE_ICONS = {
    one: faDiceOne,
    two: faDiceTwo,
    three: faDiceThree,
    four: faDiceFour,
    five: faDiceFive,
    six: faDiceSix
};

function Die({ face, rolling }) {
    return (
        <div className={`Die ${rolling ? 'Die-rolling' : ''}`}>
            <FontAwesomeIcon icon={DICE_ICONS[face] || faDiceOne} />
        </div>
    );
}

export default Die;