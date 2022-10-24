export const daysDifference = (date1: Date, date2: Date) => {
  const difference = date1.getTime() - date2.getTime();
  const days = Math.abs(difference / (1000 * 3600 * 24));
  return days;
}