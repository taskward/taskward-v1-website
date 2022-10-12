import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosService, NOTES_KEY, ARCHIVE_KEY, TRASH_KEY } from "@requests";
import type {
  NoteType,
  PatchTaskFinishedFormData,
  Notes,
  Note,
  Task,
} from "@interfaces";

const useUpdateTaskFinishStateRequest = (type?: NoteType) => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isLoading, isSuccess, isError } = useMutation(
    async (formData: PatchTaskFinishedFormData): Promise<any> => {
      if (type === "note") {
        queryClient.setQueryData(
          [NOTES_KEY],
          patchCheckedStatus(
            queryClient.getQueryData([NOTES_KEY]) as Notes,
            formData
          )
        );
      } else if (type === "archive") {
        queryClient.setQueryData(
          [ARCHIVE_KEY],
          patchCheckedStatus(
            queryClient.getQueryData([ARCHIVE_KEY]) as Notes,
            formData
          )
        );
      } else if (type === "trash") {
        queryClient.setQueryData(
          [TRASH_KEY],
          patchCheckedStatus(
            queryClient.getQueryData([TRASH_KEY]) as Notes,
            formData
          )
        );
      }
      const response = await axiosService({
        method: "PUT",
        url: `tasks/${formData.id}`,
        data: { finished: formData.finished },
      });
      return response.data;
    }
  );

  const patchCheckedStatus = (
    notes: Notes,
    formData: PatchTaskFinishedFormData
  ) => {
    return {
      notes: notes.notes.map((note: Note) => {
        const tasks = note.tasks.map((task: Task) => {
          if (task.id === formData.id) {
            return {
              ...task,
              finishedAt: formData.finished ? new Date() : null,
            };
          } else {
            return task;
          }
        });
        return { ...note, tasks: tasks };
      }),
      count: notes.count,
    };
  };

  return { mutate, mutateAsync, isLoading, isSuccess, isError };
};

export default useUpdateTaskFinishStateRequest;
