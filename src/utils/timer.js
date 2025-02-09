class Timer {
  constructor(duration, onInterval, interval = 1000) {
    this.duration = duration;
    this.interval = interval;
    this.onInterval = onInterval;
    this.elapsed = 0;
    this.isInterrupted = false;

    console.log('timer created ', this.ID);
    
  }

  ID = Math.random().toString(36).substr(2, 9);

  stop() {
    this.isInterrupted = true;
  }

  start() {
    this.isInterrupted = false;

    return new Promise((resolve) => {
      const startTime = Date.now();
      const endTime = startTime + this.duration * 1000;

      let expected = startTime + this.interval;

      const step = () => {
        if (this.isInterrupted) {
          resolve(true);
        } else {
          this.elapsed = Math.floor((Date.now() - startTime) / 1000);
          this.onInterval && this.onInterval(this.elapsed);

          if (Date.now() >= endTime) {
            resolve(false);
          } else {
            const drift = Date.now() - expected;
            if (drift > this.interval) {
              console.error('timer error');
            }
            expected += this.interval;
            setTimeout(step, Math.max(0, this.interval - drift));
          }
        }
      };

      setTimeout(step, this.interval);
    });
  }

  reset() {
    this.elapsed = 0;
  }
}

export default Timer;
