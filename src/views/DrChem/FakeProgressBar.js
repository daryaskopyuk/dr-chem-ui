import React, { useEffect, useState, useRef } from 'react';

import { ProgressBar } from '@datarobot/design-system/js/progress-bar';
import { LoadingIcon } from '@datarobot/design-system/js/loading-icon';

import './FakeProgressBar.scss';

const STEP_SM = 0.5;
const STEP_BIG = 0.5;
const THRESHOLD_TO_SLOW_DOWN = 80;
const INTERVAL_DELAY = 100;

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
    const nextValue = progressCounter > THRESHOLD_TO_SLOW_DOWN ? progressCounter + STEP_SM : progressCounter + STEP_BIG
    setProgressCounter(Math.round(nextValue))
  }, progressCounter < 99 ? INTERVAL_DELAY : null)

  return (
    <div className="fake-progress-bar">
      <div className="fake-msg">
        <LoadingIcon message={''} />
        <h4>{`${progressLabel}: ${progressCounter}%`}</h4>
      </div>
      <ProgressBar value={progressCounter} max={99} />
    </div>
  )
}
