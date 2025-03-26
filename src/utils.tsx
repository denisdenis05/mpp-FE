export const getBackgroundColor = (
  value: number,
  stats: { min: number; average: number; max: number }
) => {
  const threshold = Math.log10(stats.max - stats.min + 1);

  if (value >= stats.min && value < stats.average - threshold) {
    return "red";
  } else if (
    value >= stats.average - threshold &&
    value <= stats.average + threshold
  ) {
    return "yellow";
  } else if (value > stats.average + threshold && value <= stats.max) {
    return "green";
  }
  return "transparent";
};
