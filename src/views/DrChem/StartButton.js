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

      <div className="autopilot-mode">
        <span className='bold-label'>Modeling mode:</span>
        <span className="mode-name">Autopilot</span>
      </div>
    </div>
)
}
