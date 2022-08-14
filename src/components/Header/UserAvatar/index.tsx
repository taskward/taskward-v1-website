import { useEffect } from "react";
import { isLogin, getUserInfoFromStorage, clearLocalStorage } from "@utils";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@hooks";
import { type UserInfo, userAction } from "@store";
import { shallowEqual } from "react-redux";
import { getUserInfo } from "@requests";

export default function UserAvatar(): JSX.Element | null {
  const userInfo = useAppSelector<UserInfo | null>(
    (state) => state.user.userInfo,
    shallowEqual
  );
  const userDispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfoFromStorage = getUserInfoFromStorage();
    if (!isLogin()) {
      navigate("/login", { replace: true });
      return;
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

  function logout() {
    clearLocalStorage();
    navigate("/", { replace: true });
  }

  if (userInfo) {
    return (
      <div
        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 flex justify-center items-center cursor-pointer transition-colors"
        onClick={logout}
      >
        {userInfo.avatarUrl && (
          <img
            src={userInfo.avatarUrl}
            width="32"
            height="32"
            loading="eager"
            className="rounded-full pointer-events-none"
          />
        )}
      </div>
    );
  } else {
    return null;
  }
}
