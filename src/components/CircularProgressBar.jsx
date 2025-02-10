const RADIUS = 100;

function CircularProgressBar({ radius = RADIUS, value, max }) {
  const circumference = 2 * Math.PI * radius;
  const progress = (value * 100) / max;
  const strokeDashoffset = circumference * ((100 - progress) / 100);

  return (
    <svg
      width="300"
      height="300"
      viewBox="-37.5 -37.5 375 375"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'rotate(-90deg)' }}
    >
      <circle
        r={radius}
        cx="150"
        cy="150"
        fill="transparent"
        stroke="#e0e0e0"
        strokeWidth="100"
      ></circle>
      <circle
        r={radius}
        cx="150"
        cy="150"
        stroke="#76e5b1"
        strokeWidth="100"
        strokeLinecap="butt"
        strokeDashoffset={strokeDashoffset}
        fill="transparent"
        strokeDasharray={circumference}
      ></circle>
    </svg>
  );
}

export default CircularProgressBar;
