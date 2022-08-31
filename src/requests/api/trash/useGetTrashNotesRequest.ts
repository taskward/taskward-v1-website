import { useQuery } from "@tanstack/react-query";
import { axiosService } from "@requests";

import { TrashNotesResult } from "@interfaces";

const useGetTrashNotesRequest = () => {
  const { data, refetch, isLoading, isRefetching } = useQuery(
    ["trash.notes"],
    async (): Promise<TrashNotesResult> => {
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
