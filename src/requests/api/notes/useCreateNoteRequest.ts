import { useMutation } from "@tanstack/react-query";
import { axiosService } from "@requests";

import { NoteFormData } from "@interfaces";

const useGetNotesRequest = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    (formData: NoteFormData) => {
      return axiosService({
        method: "POST",
        url: "notes",
        data: formData,
      });
    }
  );

  return { mutate, isLoading, isSuccess, isError };
};

export default useGetNotesRequest;
