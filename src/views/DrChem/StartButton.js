import React from 'react';

import { MODELS } from './constants';

import './StartButton.scss';

export default function StartButton({ handleClick, isDisabled, selectedModel }) {
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

       <div className="selected-model-info">
         <span className="small-subtext">Selected model: </span>
         <span className="bold-caption">{MODELS.find((m) => m.bpId === selectedModel).title}</span>
       </div>
    </div>
)
}
