import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosService, NOTES_KEY, ARCHIVE_KEY } from "@requests";

const useArchiveNoteRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isLoading, isSuccess, isError } = useMutation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (id: number): Promise<any> => {
      const response = await axiosService({
        method: "PUT",
        url: `notes/${id}/archive`,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries([NOTES_KEY, ARCHIVE_KEY]);
      },
    }
  );

  return { mutate, mutateAsync, isLoading, isSuccess, isError };
};

export default useArchiveNoteRequest;
