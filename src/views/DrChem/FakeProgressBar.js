import React, { useEffect, useState, useRef } from 'react';

import { ProgressBar } from '@datarobot/design-system/js/progress-bar';

import './FakeProgressBar.scss';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function FakeProgressBar({ progressLabel = ''}) {
  const [progressCounter, setProgressCounter] = useState(0);

  useInterval(() => {
    const newVal = progressCounter + 0.5
    setProgressCounter(progressCounter > 70 ? progressCounter + 0.1 : progressCounter + 0.5)
  }, 100)

  return (
    <div className="fake-progress-bar">
      <h4>{progressLabel}</h4>
      <ProgressBar value={progressCounter} max={99} />
    </div>
  )
}
