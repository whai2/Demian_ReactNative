export function extractTime(dateString: string) {
  const date = new Date(dateString);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const period = hours >= 12 ? '오후' : '오전';

  hours = hours % 12;
  hours = hours ? hours : 12; 
  return `${period} ${padZero(hours)}:${padZero(minutes)}`;
}

function padZero(number: number) {
  return number.toString().padStart(2, '0');
}