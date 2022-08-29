import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosService } from "@requests";

import { NoteFormData } from "@interfaces";

const useGetNotesRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isLoading, isSuccess, isError } = useMutation(
    /* eslint-disable @typescript-eslint/no-explicit-any */
    async (formData: NoteFormData): Promise<any> => {
      const response = await axiosService({
        method: "POST",
        url: "notes",
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

export default useGetNotesRequest;
