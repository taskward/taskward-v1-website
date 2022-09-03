import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosService } from "@requests";

import { EditNoteFormData } from "@interfaces";

const useUpdateNoteRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isLoading, isSuccess, isError } = useMutation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (formData: EditNoteFormData): Promise<any> => {
      const response = await axiosService({
        method: "PUT",
        url: `notes/${formData.id}`,
        data: formData,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        return queryClient.refetchQueries(["notes"]);
      },
    }
  );

  return { mutate, mutateAsync, isLoading, isSuccess, isError };
};

export default useUpdateNoteRequest;
