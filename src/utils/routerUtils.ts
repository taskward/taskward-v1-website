// 根据 Query String 获取值
function getQueryString(para: string): string | null {
  const reg = new RegExp('(^|&)' + para + '=([^&]*)(&|$)', 'i')
  const matchArray = location.search.substring(1).match(reg)
  if (matchArray !== null) {
    return decodeURIComponent(matchArray[2])
  }
  return null
}

export { getQueryString }
