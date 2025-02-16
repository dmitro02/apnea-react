import { useMemo, useState } from 'react';
import './App.css';
import Timer from './utils/timer';
import CircularProgressBar from './components/CircularProgressBar';
import { formatTime } from './utils/utils';

const DURATION = 10;
const COUNTDDOWN_DURATION = 3;
const NUMBER_OF_ROUNDS = 4;

function App() {
  const [elapsed, setElapsed] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [recordTime, setRecordTime] = useState(0);

  const timer = useMemo(() => new Timer(DURATION, setElapsed), []);

  const records = [];

  const start = async () => {
    reset();
    setIsStarted(true);
    for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
      const isInterrupted = await timer.start();
      setRecordTime(0);
      if (isInterrupted) {
        break;
      }
    }
    setIsStarted(false);
    console.log('records', records);
    
  };

  const record = () => {
    const r = elapsed;
    setRecordTime(r);
    records.push(r);
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
  const showAlert = isStarted && timeLeft <= COUNTDDOWN_DURATION;

  return (
    <>
      <CircularProgressBar
        value={elapsed}
        max={DURATION}
        showAlert={showAlert}
        recordTime={recordTime}
      />
      <div className="card">
        <button onClick={isStarted ? record : start} disabled={!!recordTime}>
          {isStarted ? 'record' : 'start'}
        </button>
        <button
          onClick={isStarted ? stop : reset}
          disabled={!isStarted && !elapsed}
        >
          {isStarted ? 'stop' : 'reset'}
        </button>
        <p>{formatTime(timeLeft)}</p>
        <p>elapsed: {elapsed}</p>
        <p>timeLeft: {timeLeft}</p>
        <p>records: {records.toString()}</p>
      </div>
    </>
  );
}

export default App;
