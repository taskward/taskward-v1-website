import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosService } from "@requests";

import { NoteFormData } from "@interfaces";

const useUpdateNoteRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isLoading, isSuccess, isError } = useMutation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (formData: NoteFormData & { id: number }): Promise<any> => {
      const response = await axiosService({
        method: "PUT",
        url: `notes/${formData.id}`,
        data: formData,
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

export default useUpdateNoteRequest;
