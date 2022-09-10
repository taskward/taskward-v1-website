import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import clsx from "clsx";
import styles from "./styles.module.css";

import { Button, Icon, TaskCheckbox } from "@components";
import {
  CustomComponentProps,
  type NoteFormData,
  NoteFormSchema,
  TaskSubmitType,
} from "@interfaces";
import { useDetectOutsideClick } from "@hooks";
import { useCreateNoteRequest } from "@requests";
import { generateGUID } from "@utils";

export default function NoteCreator({
  style,
  className,
}: CustomComponentProps): JSX.Element {
  const { t } = useTranslation(["common", "note"]);

  const { mutate: createNote, isLoading } = useCreateNoteRequest();

  const [editable, setEditable] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<TaskSubmitType[]>([]);

  const outsideClickRef = useDetectOutsideClick({
    outsideClickCallback: () => {
      setEditable(false);
    },
    insideClickCallback: () => {
      setEditable(true);
      setTaskList(getValues("tasks") ?? []);
    },
  });

  const { handleSubmit, getValues, setValue, reset } = useForm<NoteFormData>({
    resolver: yupResolver(NoteFormSchema),
  });

  const handleCreateNote = async (formData: NoteFormData) => {
    createNote(formData, {
      onSuccess: () => {
        setEditable(false);
        reset();
      },
    });
  };

  const removeTaskById = (tasks: TaskSubmitType[], id: string) => {
    const result = tasks.filter((task) => task.id !== id);
    setValue("tasks", result);
    setTaskList(result);
  };

  const changeChecked = (tasks: TaskSubmitType[], id: string) => {
    const result = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, finished: !task.finished };
      }
      return task;
    });
    setValue("tasks", result);
    setTaskList(result);
  };

  const changeContent = (
    tasks: TaskSubmitType[],
    id: string,
    content: string | null
  ) => {
    const result = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, content: content };
      }
      return task;
    });
    setValue("tasks", result);
  };

  const changeLinkUrl = (
    tasks: TaskSubmitType[],
    id: string,
    linkUrl: string | null
  ) => {
    const result = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, linkUrl: linkUrl };
      }
      return task;
    });
    setValue("tasks", result);
  };

  return (
    <div
      className={clsx(
        "mx-auto shrink-0 rounded-lg border border-gray-200 bg-white p-4 ring-0 drop-shadow-lg dark:border-neutral-800 dark:bg-noteDark",
        className
      )}
      style={style}
      ref={outsideClickRef}
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleCreateNote)}
      >
        {editable ? (
          <>
            <div
              className={clsx(
                "w-full cursor-text select-text resize-none whitespace-pre-wrap break-words px-0 text-lg font-medium outline-none placeholder:text-gray-500 empty:before:text-gray-500 empty:before:content-[attr(placeholder)] dark:placeholder-gray-400",
                styles.textarea
              )}
              placeholder={t("common:TITLE")}
              contentEditable
              onInput={(e) => {
                setValue("name", e.currentTarget.textContent as string, {
                  shouldValidate: true,
                });
              }}
              dangerouslySetInnerHTML={{ __html: getValues("name") }}
            />
            <div
              className={clsx(
                "min-h-[1.25rem] w-full cursor-text select-text resize-none whitespace-pre-wrap break-words px-0 text-sm font-normal tracking-wide outline-none placeholder:text-gray-500 empty:before:text-gray-500 empty:before:content-[attr(placeholder)] dark:text-noteSecondTextDark dark:placeholder-gray-400",
                styles.textarea
              )}
              placeholder={t("note:NOTE.CREATE.PLACEHOLDER")}
              contentEditable
              onInput={(e) => {
                setValue("description", e.currentTarget.textContent as string, {
                  shouldValidate: true,
                });
              }}
              dangerouslySetInnerHTML={{ __html: getValues("description") }}
            />
            <div className="flex flex-col gap-1.5">
              {taskList.map((task: TaskSubmitType) => {
                return (
                  <TaskCheckbox
                    key={task.id}
                    checkboxTitle={task.content}
                    checked={task.finished}
                    linkUrl={task.linkUrl}
                    editable
                    //draggable
                    removeTask={() => {
                      removeTaskById(taskList, task.id as string);
                    }}
                    changeChecked={() => {
                      changeChecked(taskList, task.id as string);
                    }}
                    changeContent={(content: string | null) => {
                      changeContent(taskList, task.id as string, content);
                    }}
                    changeLinkUrl={(linkUrl: string | null) => {
                      changeLinkUrl(taskList, task.id as string, linkUrl);
                    }}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="sm"
                title={t("note:TASK.CREATE")}
                onClick={() => {
                  const result = taskList.map((task) => task);
                  result.push({
                    id: generateGUID(),
                    content: null,
                    linkUrl: null,
                    finished: false,
                  });
                  setValue("tasks", result);
                  setTaskList(result);
                }}
                icon={
                  <Icon.AddTask
                    width="12"
                    height="12"
                    className="flex-shrink-0 fill-white"
                  />
                }
              />
              <div className="flex items-center gap-2.5">
                <Button
                  type="submit"
                  size="sm"
                  title={t("common:CREATE")}
                  disabled={isLoading}
                  className={clsx(isLoading && "cursor-not-allowed")}
                  icon={
                    isLoading ? (
                      <Icon.Loading width="12" height="12" />
                    ) : (
                      <Icon.Add
                        width="12"
                        height="12"
                        className="flex-shrink-0 fill-white"
                      />
                    )
                  }
                />
                <Button
                  type="button"
                  size="sm"
                  title={t("common:CANCEL")}
                  color="danger"
                  onClick={() => {
                    setEditable(false);
                    reset();
                    setTaskList([]);
                  }}
                  icon={
                    <Icon.Close
                      width="12"
                      height="12"
                      className="flex-shrink-0 fill-white"
                    />
                  }
                />
              </div>
            </div>
          </>
        ) : (
          <input
            className="w-full font-medium placeholder:text-gray-500 focus:outline-none dark:bg-noteDark dark:placeholder-gray-400"
            placeholder={t("note:NOTE.CREATE.PLACEHOLDER")}
          />
        )}
      </form>
    </div>
  );
}
