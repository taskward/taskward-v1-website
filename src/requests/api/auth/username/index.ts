import { store, userAction } from "@store";
import { axiosService } from "@requests";
import { LOCAL_STORAGE_TOKEN } from "@utils";
import { i18n } from "@i18n";
import { LoginFormData, SignupFormData } from "@interfaces";

async function loginByUsername(loginFormData: LoginFormData) {
  try {
    const response = await axiosService({
      method: "POST",
      url: "auth/username/login",
      data: loginFormData,
    });
    if (response?.status === 200 && response?.data) {
      if (response.data.accessToken) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken);
      }
      if (response.data.user) {
        store.dispatch(userAction.updateUserInfo(response.data.user));
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    history.replaceState(
      { message: i18n.t("request:LOGIN.FAILED") },
      "",
      "/login"
    );
    return false;
  }
}

async function signupByUsername(signupFormData: SignupFormData) {
  try {
    const response = await axiosService({
      method: "POST",
      url: "auth/username/signup",
      data: signupFormData,
    });
    if (response?.status === 200 && response?.data) {
      if (response.data.accessToken) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken);
      }
      if (response.data.user) {
        store.dispatch(userAction.updateUserInfo(response.data.user));
      }
      return true;
    }
    return false;
  } catch (error) {
    history.replaceState(
      { message: i18n.t("request:SIGNUP.FAILED") },
      "",
      "/signup"
    );
    return false;
  }
}

export { loginByUsername, signupByUsername };
