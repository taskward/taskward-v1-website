import { useQuery } from "@tanstack/react-query";

import { axiosService, TRASH_KEY } from "@requests";
import { Notes } from "@interfaces";

const useGetTrashNotesRequest = () => {
  const { data, refetch, isLoading, isRefetching } = useQuery(
    [TRASH_KEY],
    async (): Promise<Notes> => {
      const response = await axiosService({
        method: "GET",
        url: "trash/notes",
      });
      return response.data;
    }
  );

  return { data, refetch, isLoading, isRefetching };
};

export default useGetTrashNotesRequest;
