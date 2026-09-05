import React from 'react';

function Button({ text, onClick,testId,disabled = false, className = '' }) {
    return (
        <button
            className={`custom-button ${className}`}
            disabled={disabled}
            onClick={onClick}
            data-testid={testId}
        >
            {text}
        </button>
    );
}

export default Button;