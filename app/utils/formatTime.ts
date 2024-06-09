const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  // Format minutes and seconds
  const minutesStr =
    minutes > 0
      ? `${minutes}:${seconds.toString().padStart(2, "0")}`
      : `${seconds}s`;

  return minutesStr;
};

export default formatTime;
