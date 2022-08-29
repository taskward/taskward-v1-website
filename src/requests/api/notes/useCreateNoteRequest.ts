import { useMutation } from "@tanstack/react-query";
import { axiosService } from "@requests";

import { NoteFormData } from "@interfaces";

const useGetNotesRequest = () => {
  const { mutate, mutateAsync, isLoading, isSuccess, isError } = useMutation(
    async (formData: NoteFormData): Promise<any> => {
      const response = await axiosService({
        method: "POST",
        url: "notes",
        data: formData,
      });
      return response.data;
    }
  );

  return { mutate, mutateAsync, isLoading, isSuccess, isError };
};

export default useGetNotesRequest;
