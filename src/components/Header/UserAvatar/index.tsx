import { useEffect } from "react";
import { isLogin, getUserInfoFromStorage } from "@utils";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@hooks";
import { type UserInfo, userAction } from "@store";
import { shallowEqual } from "react-redux";
import { getUserInfo } from "@requests";

export default function UserAvatar(): JSX.Element | null {
  const userInfo = useAppSelector<UserInfo>(
    (state) => state.user.userInfo,
    shallowEqual
  );
  const userDispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfoFromStorage = getUserInfoFromStorage();
    if (!isLogin) {
      navigate("/login");
    }
    if (userInfoFromStorage) {
      userDispatch(userAction.updateUserInfo(userInfoFromStorage));
    } else {
      handleGetUserInfo();
    }
  }, []);

  async function handleGetUserInfo() {
    const response: UserInfo = await getUserInfo();
    userDispatch(userAction.updateUserInfo(response));
  }

  if (userInfo) {
    return <div>{userInfo.name}</div>;
  } else {
    return null;
  }
}
