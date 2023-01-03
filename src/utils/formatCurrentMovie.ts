const formatCurrentMovie = (current: number): string => {
  const hours = Math.floor(current / 60);
  const minutes = current % 60;

  return `${hours}h ${minutes < 10 ? `0${minutes}` : minutes}m`;
};

export { formatCurrentMovie };
