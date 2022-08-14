import { useNavigate } from "react-router-dom";
import { isLogin } from "@utils";

export default function Authentication({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const navigate = useNavigate();
  const loginStatus: boolean = isLogin();

  if (!loginStatus) {
    navigate("/login", { replace: true });
  }

  return children;
}
