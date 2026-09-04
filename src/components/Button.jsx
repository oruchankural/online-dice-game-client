import React from 'react';

function Button({ text, onClick, disabled = false, className = '' }) {
    return (
        <button
            className={`custom-button ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;