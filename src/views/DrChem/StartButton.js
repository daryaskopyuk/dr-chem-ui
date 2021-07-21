import React from 'react';

import './StartButton.scss';

export default function StartButton({ handleClick, isDisabled }) {
  return (
    <div className="start-button-block">
      <button
        className="start-button"
        disabled={isDisabled}
        onClick={handleClick}
      >
      <span className="separator">
        <span className="start-label">Start</span>
      </span>
      </button>
    </div>
)
}
