import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosService, NOTES_KEY, ARCHIVE_KEY } from "@requests";
import { EditNoteFormData } from "@interfaces";
import { NoteType } from "@interfaces";

const useUpdateNoteRequest = (type?: NoteType) => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isLoading, isSuccess, isError } = useMutation(
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
        if (type === "note") {
          return queryClient.invalidateQueries([NOTES_KEY]);
        } else if (type === "archive") {
          return queryClient.invalidateQueries([ARCHIVE_KEY]);
        }
      },
    }
  );

  return { mutate, mutateAsync, isLoading, isSuccess, isError };
};

export default useUpdateNoteRequest;
