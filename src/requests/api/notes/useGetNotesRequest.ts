import { useQuery } from "@tanstack/react-query";
import { axiosService } from "@requests";

import { NotesResult } from "./_interfaces";

const useGetNotesRequest = () => {
  const { data, refetch, isLoading } = useQuery(
    ["notes"],
    async (): Promise<NotesResult> => {
      const response = await axiosService({
        method: "GET",
        url: "notes",
      });
      return response.data;
    }
  );

  return { data, refetch, isLoading };
};

export default useGetNotesRequest;
