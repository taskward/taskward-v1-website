import dayjs from 'dayjs'

// UTC 时间转为本地时间
function convertUtcToLocalTime(date: Date): string {
  const today = new Date()
  const _date = new Date(date)
  const thisYear = today.getFullYear()
  const year = _date.getFullYear()
  if (thisYear === year) {
    return dayjs(_date).format('MM/DD HH:mm')
    //return dayjs(_date).format("MM/DD HH:mm:ss");
  }
  return dayjs(_date).format('YYYY/MM/DD HH:mm')
  //return dayjs(_date).format("YYYY/MM/DD HH:mm:ss");
}

// UTC 时间转为本地时间（完全格式）
function convertUtcToFullLocalTime(date: Date): string {
  return dayjs(new Date(date)).format('YYYY/MM/DD dddd HH:mm:ss A')
}

export { convertUtcToLocalTime, convertUtcToFullLocalTime }
