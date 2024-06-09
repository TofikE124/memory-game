const formatTime = (timeInSeconds: number) => {
  const time = Math.ceil(timeInSeconds);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // Format minutes and seconds
  const minutesStr =
    minutes > 0
      ? `${minutes}:${seconds.toString().padStart(2, "0")}`
      : `${seconds}s`;

  return minutesStr;
};

export default formatTime;
