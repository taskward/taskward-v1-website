import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosService, NOTES_KEY, TRASH_KEY } from "@requests";

const useRestoreTrashNoteRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isLoading, isSuccess, isError } = useMutation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (id: number): Promise<any> => {
      const response = await axiosService({
        method: "PUT",
        url: `trash/notes/${id}`,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries([NOTES_KEY]),
          queryClient.invalidateQueries([TRASH_KEY]),
        ]);
      },
    }
  );

  return { mutate, mutateAsync, isLoading, isSuccess, isError };
};

export default useRestoreTrashNoteRequest;
