import { useMemo, useReducer } from 'react';
import './App.css';
import Timer from './utils/timer';

const DURATION = 8;

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'start':
        return { ...state, isStarted: true };
      case 'end':
        return { ...state, isStarted: false, isStopped: action.payload };
      case 'stop':
        return { ...state, isStarted: false, isStopped: true };
      case 'reset':
        return { ...state, isStopped: false, elapsed: 0 };
      case 'setElapsed':
        return { ...state, elapsed: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    elapsed: 0,
    isStarted: false,
    isStopped: false,
  });

  const timer = useMemo(
    () =>
      new Timer(DURATION, (elapsed) =>
        dispatch({ type: 'setElapsed', payload: elapsed })
      ),
    []
  );

  const start = async () => {
    dispatch({ type: 'start' });
    const isInterrupted = await timer.start();
    dispatch({ type: 'end', payload: isInterrupted });
  };

  const stop = () => {
    timer.stop();
    dispatch({ type: 'stop' });
  };

  const reset = () => {
    timer.reset();
    dispatch({ type: 'reset' });
  };

  const { isStarted, isStopped, elapsed } = state;

  return (
    <>
      <div className="card">
        <button onClick={start} disabled={isStarted}>
          start
        </button>
        <button
          onClick={isStopped ? reset : stop}
          disabled={!isStarted && !isStopped}
        >
          {isStopped ? 'reset' : 'stop'}
        </button>
        <p>{elapsed}</p>
      </div>
    </>
  );
}

export default App;
