import { axiosService } from "@requests";

async function getUserInfo(): Promise<any> {
  try {
    const response = await axiosService({
      method: "GET",
      url: "user"
    });
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export { getUserInfo };
