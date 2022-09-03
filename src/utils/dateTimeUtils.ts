import dayjs from "dayjs";

function convertUtcToLocalTime(date: Date): string {
  const today = new Date();
  const _date = new Date(date);
  const thisYear = today.getFullYear();
  const year = _date.getFullYear();
  if (thisYear === year) {
    return dayjs(_date).format("MM/DD HH:mm");
    //return dayjs(_date).format("MM/DD HH:mm:ss");
  }
  return dayjs(_date).format("YYYY/MM/DD HH:mm");
  //return dayjs(_date).format("YYYY/MM/DD HH:mm:ss");
}

function convertUtcToFullLocalTime(date: Date): string {
  return dayjs(new Date(date)).format("YYYY/MM/DD dddd HH:mm A");
  //return dayjs(new Date(date)).format("YYYY/MM/DD dddd HH:mm:ss A");
}

export { convertUtcToLocalTime, convertUtcToFullLocalTime };
