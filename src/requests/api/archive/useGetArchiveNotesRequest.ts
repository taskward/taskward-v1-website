import { useQuery } from "@tanstack/react-query";
import { axiosService, ARCHIVE_KEY } from "@requests";

import { NotesResult } from "@interfaces";

const useGetArchiveNotesRequest = () => {
  const { data, refetch, isLoading, isRefetching } = useQuery(
    [ARCHIVE_KEY],
    async (): Promise<NotesResult> => {
      const response = await axiosService({
        method: "GET",
        url: "archive/notes",
      });
      return response.data;
    }
  );

  return { data, refetch, isLoading, isRefetching };
};

export default useGetArchiveNotesRequest;
