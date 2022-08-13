import { useState, useEffect } from "react";
import { isLogin } from "@utils";

export default function UserAvatar(): JSX.Element {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    isLogin() && setShow(true);
  }, []);
  return <div></div>;
}
