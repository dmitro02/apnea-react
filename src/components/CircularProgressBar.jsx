const REST_COLOR = '#2d728c';

function CircularProgressBar({
  radius,
  value,
  max,
  color,
  alertColor,
  showAlert,
  recordTime,
}) {
  const circumference = 2 * Math.PI * radius;
  const progress = (value * 100) / max;
  const strokeDashoffset = circumference * ((100 - progress) / 100);
  const strokeDashoffsetRecord =
    circumference * ((100 - (recordTime * 100) / max) / 100);

  return (
    <svg
      width="300"
      height="300"
      viewBox="-37.5 -37.5 375 375"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'rotate(-90deg)' }}
    >
      <circle // background circle
        r={radius}
        cx="150"
        cy="150"
        fill="transparent"
        stroke="#e0e0e0"
        strokeWidth="120"
      />
      <circle // rest circle
        r={radius}
        cx="150"
        cy="150"
        stroke={REST_COLOR}
        strokeWidth="114"
        strokeLinecap="butt"
        strokeDashoffset={strokeDashoffset}
        fill="transparent"
        strokeDasharray={circumference}
      />
      <circle // progress circle
        r={radius}
        cx="150"
        cy="150"
        stroke={color}
        strokeWidth="114"
        strokeLinecap="butt"
        strokeDashoffset={
          recordTime ? strokeDashoffsetRecord : strokeDashoffset
        }
        fill="transparent"
        strokeDasharray={circumference}
      />

      <circle // center circle
        r="22"
        cx="150"
        cy="150"
        fill="#e0e0e0"
        strokeWidth="0"
      />
      <circle // alert circle
        r={radius + 66}
        cx="150"
        cy="150"
        fill="transparent"
        stroke={alertColor}
        strokeWidth="8"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="2s"
          repeatCount="indefinite"
        />
        <set attributeName="display" to={showAlert ? 'block' : 'none'} />
      </circle>
    </svg>
  );
}

export default CircularProgressBar;
