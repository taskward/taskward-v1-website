import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosService } from "@requests";

const useDeleteNoteRequest = () => {
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
        queryClient.invalidateQueries(["notes"]);
      },
    }
  );

  return { mutate, mutateAsync, isLoading, isSuccess, isError };
};

export default useDeleteNoteRequest;
