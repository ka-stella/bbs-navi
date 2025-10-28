export const formatDate = (date: Date): string => {
  if (isNaN(date.getTime())) {
    return "";
  }

  const padToTwoDigits = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  const year = date.getFullYear();
  const month = padToTwoDigits(date.getMonth() + 1);
  const day = padToTwoDigits(date.getDate());
  const hours = padToTwoDigits(date.getHours());
  const minutes = padToTwoDigits(date.getMinutes());
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};
