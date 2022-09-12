import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosService, NOTES_KEY, ARCHIVE_KEY, TRASH_KEY } from "@requests";
import type { NoteType, PatchTaskFinishedFormData } from "@interfaces";

const useUpdateTaskFinishStateRequest = (type?: NoteType) => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isLoading, isSuccess, isError } = useMutation(
    async (formData: PatchTaskFinishedFormData): Promise<any> => {
      const response = await axiosService({
        method: "PUT",
        url: `tasks/${formData.id}`,
        data: { finished: formData.finished },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        if (type === "note") {
          return queryClient.invalidateQueries([NOTES_KEY]);
        } else if (type === "archive") {
          return queryClient.invalidateQueries([ARCHIVE_KEY]);
        } else if (type === "trash") {
          return queryClient.invalidateQueries([TRASH_KEY]);
        }
      },
    }
  );

  return { mutate, mutateAsync, isLoading, isSuccess, isError };
};

export default useUpdateTaskFinishStateRequest;
