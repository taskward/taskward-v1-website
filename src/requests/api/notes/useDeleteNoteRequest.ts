import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosService, NOTES_KEY, ARCHIVE_KEY, TRASH_KEY } from "@requests";

type NoteType = "note" | "archive";

const useDeleteNoteRequest = (type: NoteType) => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isLoading, isSuccess, isError } = useMutation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (id: number): Promise<any> => {
      const response = await axiosService({
        method: "DELETE",
        url: `notes/${id}`,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        const invalidateOperations: Promise<void>[] = [
          queryClient.invalidateQueries([TRASH_KEY]),
        ];
        if (type === "note") {
          invalidateOperations.push(queryClient.invalidateQueries([NOTES_KEY]));
        } else if (type === "archive") {
          invalidateOperations.push(
            queryClient.invalidateQueries([ARCHIVE_KEY])
          );
        }
        return Promise.all(invalidateOperations);
      },
    }
  );

  return { mutate, mutateAsync, isLoading, isSuccess, isError };
};

export default useDeleteNoteRequest;
