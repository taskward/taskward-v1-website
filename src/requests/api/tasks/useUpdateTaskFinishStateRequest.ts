import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  axiosService,
  NOTES_KEY,
  ARCHIVE_KEY,
  TRASH_KEY,
  useGetNotesRequest,
  useGetArchiveNotesRequest,
  useGetTrashNotesRequest,
} from "@requests";
import type {
  NoteType,
  PatchTaskFinishedFormData,
  Notes,
  Note,
  Task,
} from "@interfaces";

const useUpdateTaskFinishStateRequest = (type?: NoteType) => {
  const queryClient = useQueryClient();

  const { data: noteData } = useGetNotesRequest();
  const { data: archiveData } = useGetArchiveNotesRequest();
  const { data: trashData } = useGetTrashNotesRequest();

  const { mutate, mutateAsync, isLoading, isSuccess, isError } = useMutation(
    async (formData: PatchTaskFinishedFormData): Promise<any> => {
      if (type === "note") {
        noteData &&
          queryClient.setQueryData(
            [NOTES_KEY],
            patchCheckedStatus(noteData, formData)
          );
      } else if (type === "archive") {
        archiveData &&
          queryClient.setQueryData(
            [ARCHIVE_KEY],
            patchCheckedStatus(archiveData, formData)
          );
      } else if (type === "trash") {
        trashData &&
          queryClient.setQueryData(
            [TRASH_KEY],
            patchCheckedStatus(trashData, formData)
          );
      }
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
