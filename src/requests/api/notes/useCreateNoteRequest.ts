import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosService, NOTES_KEY } from "@requests";

import { NoteFormData } from "@interfaces";

const useCreateNoteRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isLoading, isSuccess, isError } = useMutation(
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
        return queryClient.invalidateQueries([NOTES_KEY]);
      },
    }
  );

  return { mutate, mutateAsync, isLoading, isSuccess, isError };
};

export default useCreateNoteRequest;
