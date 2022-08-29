import { useNavigate } from "react-router-dom";
import { shallowEqual } from "react-redux";

import { Icon } from "@components";
import { userAction } from "@store";
import { User } from "@interfaces";
import { useAppSelector, useAppDispatch } from "@hooks";
import { LOCAL_STORAGE_TOKEN } from "@constants";

export default function UserAvatar(): JSX.Element | null {
  const navigate = useNavigate();
  const userDispatch = useAppDispatch();

  const user = useAppSelector<User | null>(
    (state) => state.user.user,
    shallowEqual
  );

  function logout() {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    userDispatch(userAction.updateUserInfo(null));
    navigate("/", { replace: true });
  }

  if (user) {
    return (
      <div
        className="flex cursor-pointer items-center justify-center rounded-full p-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
        // onClick={logout}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            width="32"
            height="32"
            loading="eager"
            className="pointer-events-none rounded-full"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-700">
            <Icon.Face
              width="28"
              height="28"
              className="fill-black dark:fill-white"
            />
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
}
