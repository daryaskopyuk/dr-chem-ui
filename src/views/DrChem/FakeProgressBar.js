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

export default function FakeProgressBar({ progressLabel = '', isSuccess, isLoading, isError }) {
  const [progressCounter, setProgressCounter] = useState(0);

  useInterval(() => {
    const nextValue = progressCounter > THRESHOLD_TO_SLOW_DOWN ? progressCounter + STEP_SM : progressCounter + STEP_BIG
    setProgressCounter(Math.round(nextValue))
  }, progressCounter < 99 && !isSuccess ? INTERVAL_DELAY : null)

  useEffect(() => {
    if (isSuccess || isError) {
      setProgressCounter(0);
    }
  }, [isSuccess, isError]);

  return (
    <div className="fake-progress-bar">
      {isLoading && (
        <div className="fake-progress">
          <div className="fake-msg">
            <p className="message in-progress">{`${progressLabel}: ${progressCounter}%`}</p>
          </div>
          <ProgressBar value={progressCounter} max={99} />
        </div>
      )}

      {isSuccess && (
        <div className="fake-success"
        >
          <div className="fake-msg">
            <p className="message success">Calculations completed</p>
          </div>
          <ProgressBar success={true} value={100} />
        </div>
      )}

      {isError && (
        <div className="error-block"
        >
          <div className="fake-msg">
            <p className="message error">Calculations failed. Try again</p>
          </div>
          <ProgressBar error={true} value={100} />
        </div>
      )}
    </div>
  )
}
