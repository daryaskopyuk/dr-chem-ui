import React from 'react';

import './StartButton.scss';

export default function StartButton({ handleClick, isDisabled }) {
  return (
    <button
      className="start-button"
      disabled={isDisabled}
      onClick={handleClick}
    >
      <span className="separator">
        <span className="start-label">Start</span>
      </span>
    </button>
  )
}
