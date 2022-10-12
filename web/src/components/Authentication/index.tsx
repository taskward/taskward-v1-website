import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shallowEqual } from "react-redux";

import { useAppSelector, useAppDispatch } from "@hooks";
import { getUserInfo } from "@requests";
import { validateTokenExpireTime } from "@utils";
import { LOCAL_STORAGE_TOKEN } from "@constants";
import { userAction } from "@store";

export default function Authentication({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  const navigate = useNavigate();
  const userDispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user, shallowEqual);

  useEffect(() => {
    const validateTokenResult: boolean = validateTokenExpireTime();
    if (!validateTokenResult) {
      clearLoginStatus();
    }
    if (!user) {
      initUserInfo();
    }
  }, [user]);

  const initUserInfo = async () => {
    const userInfo = await getUserInfo();
    if (userInfo) {
      userDispatch(userAction.updateUserInfo(userInfo));
    }
  };

  const clearLoginStatus = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    userDispatch(userAction.updateUserInfo(null));
    navigate("/login", { replace: true });
  };

  return <>{children}</>;
}
