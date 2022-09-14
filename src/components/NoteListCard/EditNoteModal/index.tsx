import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import clsx from "clsx";

import styles from "./styles.module.css";

import type {
  EditNoteFormData,
  Task,
  TaskFormData,
  EditNoteModalProps,
} from "@interfaces";
import { Icon, Modal, TaskCheckbox, NoteListCardPanel } from "@components";
import {
  convertUtcToLocalTime,
  convertUtcToFullLocalTime,
  isObjectHaveSameData,
  generateGUID,
} from "@utils";
import {
  useUpdateNoteRequest,
  useArchiveNoteRequest,
  useDeleteNoteRequest,
  useUnarchiveNoteRequest,
  useDeleteTrashNoteRequest,
  useRestoreTrashNoteRequest,
} from "@requests";
import { useTaskListDataManager, useCopyText } from "@hooks";

export default function EditNoteModal({
  isEdit,
  toggle,
  note,
  type,
}: EditNoteModalProps): JSX.Element {
  const { t } = useTranslation(["common", "note"]);

  const { mutateAsync: archiveNoteAsync, isLoading: isArchiveNoteLoading } =
    useArchiveNoteRequest();
  const { mutateAsync: deleteNoteAsync, isLoading: isDeleteNoteLoading } =
    useDeleteNoteRequest(type);
  const { mutateAsync: unarchiveNoteAsync, isLoading: isUnarchiveNoteLoading } =
    useUnarchiveNoteRequest();
  const {
    mutateAsync: restoreTrashNoteAsync,
    isLoading: isRestoreTrashNoteLoading,
  } = useRestoreTrashNoteRequest();
  const {
    mutateAsync: deleteTrashNoteAsync,
    isLoading: isDeleteTrashNoteLoading,
  } = useDeleteTrashNoteRequest();
  const { mutateAsync: updateNoteAsync, isLoading: isUpdateNoteLoading } =
    useUpdateNoteRequest(type);

  const {
    tasksData,
    setTasksData,
    removeTask,
    changeChecked,
    changeContent,
    changeLinkUrl,
    getLinkUrl,
  } = useTaskListDataManager();

  const copyText = useCopyText();

  const { handleSubmit, getValues, setValue, reset } =
    useForm<EditNoteFormData>({
      defaultValues: {
        id: note.id,
        name: note.name,
        description: note.description,
        tasks: [],
      },
    });

  const handleUpdateNote = async (formData: EditNoteFormData) => {
    const oldData: EditNoteFormData = {
      id: note.id,
      name: note.name,
      description: note.description,
      tasks: note.tasks.map((task) => {
        return {
          id: task.id,
          content: task.content,
          linkUrl: task.linkUrl,
          finished: task.finishedAt !== null,
        };
      }),
    };
    if (!isObjectHaveSameData(oldData, formData)) {
      await updateNoteAsync(formData);
    }
  };

  useEffect(() => {
    reset({
      id: note.id,
      name: note.name,
      description: note.description,
      tasks: [],
    });
  }, [isEdit]);

  useEffect(() => {
    const result = note.tasks.map((task: Task) => {
      return {
        id: task.id,
        content: task.content,
        linkUrl: task.linkUrl,
        finished: task.finishedAt !== null,
      };
    });
    setTasksData(result);
    setValue("tasks", result);
  }, [isEdit, note]);

  return (
    <Modal
      show={isEdit}
      toggle={toggle}
      closeModalCallback={async (): Promise<void> => {
        return handleSubmit(handleUpdateNote)();
      }}
      modalClassName="p-0"
    >
      <div className="flex items-center justify-between px-4 pt-4 dark:border-gray-600">
        <div className="flex items-center gap-1 text-xs font-medium dark:text-noteSecondTextDark">
          {convertUtcToLocalTime(note.createdAt)}
        </div>
        <button
          type="button"
          className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1 transition-colors hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600"
          onClick={toggle}
        >
          <Icon.Close
            width="20"
            height="20"
            className="fill-black dark:fill-white"
          />
        </button>
      </div>
      <form
        className={clsx(
          "flex max-h-[380px] flex-col gap-4 overflow-y-auto overflow-x-hidden px-4"
        )}
        key={`${isEdit}`}
      >
        <div
          className={clsx(
            "w-full cursor-text select-text resize-none whitespace-pre-wrap break-words px-0 text-lg font-medium outline-none placeholder:text-gray-500 empty:before:text-gray-500 empty:before:content-[attr(placeholder)] dark:placeholder-gray-400",
            styles.textarea
          )}
          placeholder={t("common:TITLE")}
          contentEditable
          dangerouslySetInnerHTML={{ __html: note.name ?? "" }}
          onInput={(e) => {
            setValue("name", e.currentTarget.textContent as string);
          }}
        />
        <div
          className={clsx(
            "w-full cursor-text select-text resize-none whitespace-pre-wrap break-words px-0 text-sm font-normal tracking-wide outline-none placeholder:text-gray-500 empty:before:text-gray-500 empty:before:content-[attr(placeholder)] dark:text-noteSecondTextDark dark:placeholder-gray-400",
            styles.textarea
          )}
          placeholder={t("note:NOTE.CREATE.PLACEHOLDER")}
          contentEditable
          dangerouslySetInnerHTML={{ __html: note.description ?? "" }}
          onInput={(e) => {
            setValue("description", e.currentTarget.textContent as string);
          }}
        />
        {tasksData && tasksData.length > 0 && (
          <div className="flex flex-col gap-1.5">
            {tasksData.map((task: TaskFormData) => {
              return (
                <TaskCheckbox
                  key={task.id}
                  task={task}
                  noteType={type}
                  editable
                  removeTask={() => {
                    setValue(
                      "tasks",
                      removeTask(getValues("tasks"), task.id as number)
                    );
                    setTasksData(
                      tasksData.filter((taskItem) => taskItem.id !== task.id)
                    );
                  }}
                  changeChecked={() => {
                    setValue(
                      "tasks",
                      changeChecked(getValues("tasks"), task.id as number)
                    );
                  }}
                  changeContent={(content: string | null) => {
                    setValue(
                      "tasks",
                      changeContent(
                        getValues("tasks"),
                        task.id as number,
                        content
                      )
                    );
                  }}
                  changeLinkUrl={(linkUrl: string | null) => {
                    setValue(
                      "tasks",
                      changeLinkUrl(
                        getValues("tasks"),
                        task.id as number,
                        linkUrl
                      )
                    );
                  }}
                  copyLinkUrl={() => {
                    copyText(
                      getLinkUrl(getValues("tasks"), task.id as number),
                      t("common:COPY.SUCCESS")
                    );
                  }}
                />
              );
            })}
          </div>
        )}
      </form>
      <div className="mt-4 flex justify-between px-4 pb-2 text-xs font-medium dark:text-noteSecondTextDark">
        <div
          className={clsx(
            "flex items-center transition-[visibility,transform,opacity]",
            isUpdateNoteLoading
              ? "visible scale-100 opacity-100"
              : "invisible scale-0 opacity-0"
          )}
        >
          <Icon.Sync width="16" height="16" className="mr-0.5" />
          {t("common:SAVING")}...
        </div>
        {note.updatedAt && (
          <div
            className="flex items-center gap-0.5"
            title={convertUtcToFullLocalTime(note.updatedAt)}
          >
            <Icon.Update
              width="16"
              height="16"
              className="fill-black dark:fill-white"
            />
            <div className="font-normal">{t("common:UPDATED.TIME")}</div>
            <div className="ml-0.5">
              {convertUtcToLocalTime(note.updatedAt)}
            </div>
          </div>
        )}
      </div>
      <div className="border-t-[1px] border-gray-200 py-1.5 px-2 dark:border-gray-600/90">
        {type === "note" && (
          <NoteListCardPanel
            focused
            note={note}
            addTask={() => {
              const result = [...tasksData];
              result.push({
                id: generateGUID(),
                content: null,
                linkUrl: null,
                finished: false,
                created: true,
              });
              setValue("tasks", result);
              setTasksData(result);
            }}
            copy={() => {
              copyText(getValues("description"), t("common:COPY.SUCCESS"));
            }}
            archive={async (id: number) => {
              await archiveNoteAsync(id);
              toggle();
            }}
            archiveLoading={isArchiveNoteLoading}
            softDelete={async (id: number) => {
              await deleteNoteAsync(id);
              toggle();
            }}
            softDeleteLoading={isDeleteNoteLoading}
          />
        )}
        {type === "archive" && (
          <NoteListCardPanel
            focused
            note={note}
            addTask={() => {
              const result = [...tasksData];
              result.push({
                id: generateGUID(),
                content: null,
                linkUrl: null,
                finished: false,
                created: true,
              });
              setValue("tasks", result);
              setTasksData(result);
            }}
            copy={() => {
              copyText(getValues("description"), t("common:COPY.SUCCESS"));
            }}
            unarchive={async (id: number) => {
              await unarchiveNoteAsync(id);
              toggle();
            }}
            unarchiveLoading={isUnarchiveNoteLoading}
            softDelete={async (id: number) => {
              await deleteNoteAsync(id);
              toggle();
            }}
            softDeleteLoading={isDeleteNoteLoading}
          />
        )}
        {type === "trash" && (
          <NoteListCardPanel
            focused
            note={note}
            addTask={() => {
              const result = [...tasksData];
              result.push({
                id: generateGUID(),
                content: null,
                linkUrl: null,
                finished: false,
                created: true,
              });
              setValue("tasks", result);
              setTasksData(result);
            }}
            copy={() => {
              copyText(getValues("description"), t("common:COPY.SUCCESS"));
            }}
            restore={async (id: number) => {
              await restoreTrashNoteAsync(id);
              toggle();
            }}
            restoreLoading={isRestoreTrashNoteLoading}
            forceDelete={async (id: number) => {
              await deleteTrashNoteAsync(id);
              toggle();
            }}
            forceDeleteLoading={isDeleteTrashNoteLoading}
          />
        )}
      </div>
    </Modal>
  );
}
