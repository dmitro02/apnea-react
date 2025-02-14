export const formatTime = (elapsedSec) => {
  let min = Math.floor(elapsedSec / 60)
  let sec = elapsedSec - min * 60
  return addLeadingZeroToMinSec(min) + ':' + addLeadingZeroToMinSec(sec)
}

const addLeadingZeroToMinSec = (val) => val < 10 ? '0' + val : val