import { axiosService } from "@requests";

async function getUserInfo(): Promise<any> {
  try {
    let response = await axiosService.get("user");
    if (response?.status === 200 && response?.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { getUserInfo };
