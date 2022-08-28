import { useQuery } from "@tanstack/react-query";
import { axiosService } from "@requests";

const useGetNotesRequest = () => {
  const { data, refetch, isLoading } = useQuery(["notes"], async () => {
    const data = await getNotes();
    return data;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNotes = async (): Promise<unknown> => {
    try {
      const response = await axiosService({
        method: "GET",
        url: "notes",
      });
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  return { data, refetch, isLoading };
};

export default useGetNotesRequest;
