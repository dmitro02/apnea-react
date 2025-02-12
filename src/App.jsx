import { useMemo, useState } from 'react';
import './App.css';
import Timer from './utils/timer';
import CircularProgressBar from './components/CircularProgressBar';

const DURATION = 12;
const RADIUS = 90;
const PROGRESS_COLOR = '#3287a8';
const GET_READY_COLOR = '#de5952';
const COUNTDDOWN_DURATION = 4;

function App() {
  const [elapsed, setElapsed] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [recordTime, setRecordTime] = useState(0);

  const timer = useMemo(() => new Timer(DURATION, setElapsed), []);

  const start = async () => {
    reset();
    setIsStarted(true);
    await timer.start();
    setIsStarted(false);
  };

  const record = () => {
    setRecordTime(elapsed);
  };

  const stop = () => {
    timer.stop();
    setIsStarted(false);
  };

  const reset = () => {
    timer.reset();
    setElapsed(0);
    setRecordTime(0);
  };

  const timeLeft = DURATION - elapsed;
  const showAlert = timeLeft <= COUNTDDOWN_DURATION;

  return (
    <>
      <CircularProgressBar
        radius={RADIUS}
        value={elapsed}
        max={DURATION}
        color={PROGRESS_COLOR}
        alertColor={GET_READY_COLOR}
        showAlert={showAlert}
        recordTime={recordTime}
      />
      <div className="card">
        <button onClick={isStarted ? record : start}>
          {isStarted ? "record" : "start"}
        </button>
        <button
          onClick={isStarted ? stop : reset}
          disabled={!isStarted && !elapsed}
        >
          {isStarted ? 'stop' : 'reset'}
        </button>
        <p>elapsed: {elapsed}</p>
        <p>timeLeft: {timeLeft}</p>
        <p>showAlert: {showAlert}</p>
      </div>
    </>
  );
}

export default App;
