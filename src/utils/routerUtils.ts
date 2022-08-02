function getQueryString(para: string): string | null {
  const reg: RegExp = new RegExp("(^|&)" + para + "=([^&]*)(&|$)", "i");
  const matchArray = window.location.search.substring(1).match(reg);
  if (matchArray !== null) {
    return decodeURIComponent(matchArray[2]);
  }
  return null;
}

export { getQueryString };
