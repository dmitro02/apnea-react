import { useMemo, useState } from 'react';
import './App.css';
import Timer from './utils/timer';
import CircularProgressBar from './components/CircularProgressBar';

const DURATION = 8;

function App() {
  const [elapsed, setElapsed] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const timer = useMemo(() => new Timer(DURATION, setElapsed), []);

  const start = async () => {
    setElapsed(0);
    setIsStarted(true);
    await timer.start();
    setIsStarted(false);
  };

  const stop = () => {
    timer.stop();
    setIsStarted(false);
  };

  const reset = () => {
    timer.reset();
    setElapsed(0);
  };

  return (
    <>
      <CircularProgressBar value={elapsed} max={DURATION} />
      <div className="card">
        <button onClick={start} disabled={isStarted}>
          start
        </button>
        <button
          onClick={isStarted ? stop : reset}
          disabled={!isStarted && !elapsed}
        >
          {isStarted ? 'stop' : 'reset'}
        </button>
        <p>{elapsed}</p>
      </div>
    </>
  );
}

export default App;
