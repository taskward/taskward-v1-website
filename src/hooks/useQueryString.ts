import { useLocation } from "react-router-dom";

export default function useQueryString(para: string): string | null {
  const location = useLocation();
  const reg: RegExp = new RegExp("(^|&)" + para + "=([^&]*)(&|$)", "i");
  const matchArray = location.search.substring(1).match(reg);
  if (matchArray !== null) {
    return decodeURIComponent(matchArray[2]);
  }
  return null;
}
