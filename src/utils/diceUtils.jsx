import { DiceConstants } from '../constants/DiceConstants';

export const calculateTotal = (diceArray) => {
    return diceArray.reduce((sum, face) => sum + DiceConstants.SIDES.indexOf(face) + 1, 0);
};

export const calculateAverage = (diceArray) => {
    if (!diceArray.length) return 0;
    const total = calculateTotal(diceArray);
    return Number((total / diceArray.length).toFixed(2));
};

export const generateRandomDice = (count) => {
    return Array.from({ length: count }, () =>
        DiceConstants.SIDES[Math.floor(Math.random() * DiceConstants.SIDES.length)]
    );
};