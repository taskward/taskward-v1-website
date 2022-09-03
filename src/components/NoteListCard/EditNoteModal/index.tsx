import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";

import styles from "./styles.module.css";

import { Note, type EditNoteFormData, EditNoteFormSchema } from "@interfaces";
import { Icon, Modal } from "@components";
import {
  convertUtcToLocalTime,
  convertUtcToFullLocalTime,
  isObjectHaveSameData,
} from "@utils";
import { useUpdateNoteRequest } from "@requests";

export default function EditNoteModal({
  isEdit,
  toggle,
  note,
}: {
  isEdit: boolean;
  toggle: () => void;
  note: Note;
}): JSX.Element {
  const { t } = useTranslation(["common", "note"]);

  const { mutateAsync: updateNoteAsync, isLoading: isUpdateNoteLoading } =
    useUpdateNoteRequest();

  const { handleSubmit, setValue, reset } = useForm<EditNoteFormData>({
    defaultValues: {
      id: note.id,
      name: note.name,
      description: note.description,
    },
    resolver: yupResolver(EditNoteFormSchema),
  });

  const handleUpdateNote = async (formData: EditNoteFormData) => {
    const oldData: EditNoteFormData = {
      id: note.id,
      name: note.name,
      description: note.description,
    };
    if (!isObjectHaveSameData(oldData, formData)) {
      await updateNoteAsync(formData);
    }
  };

  useEffect(() => {
    reset({ id: note.id, name: note.name, description: note.description });
  }, [isEdit]);

  return (
    <Modal
      show={isEdit}
      toggle={toggle}
      closeModalCallback={async (): Promise<void> => {
        await handleSubmit(handleUpdateNote)();
      }}
    >
      <div className="flex items-center justify-between dark:border-gray-600">
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
      <form className="mt-2 flex flex-col gap-4" key={`${isEdit}`}>
        <div
          className={clsx(
            "w-full cursor-text select-text resize-none whitespace-pre-wrap break-words px-0 text-lg font-medium outline-none placeholder:text-gray-500 empty:before:text-gray-500 empty:before:content-[attr(placeholder)] focus:outline-none dark:placeholder-gray-400",
            styles.textarea
          )}
          placeholder={t("common:TITLE")}
          contentEditable
          dangerouslySetInnerHTML={{ __html: note.name }}
          onInput={(e) => {
            setValue("name", e.currentTarget.textContent as string, {
              shouldValidate: true,
            });
          }}
        />
        <div
          className={clsx(
            "min-h-[1.25rem] w-full cursor-text select-text resize-none whitespace-pre-wrap break-words px-0 text-sm font-normal tracking-wide outline-none placeholder:text-gray-500 empty:before:text-gray-500 empty:before:content-[attr(placeholder)] focus:outline-none dark:text-noteSecondTextDark dark:placeholder-gray-400",
            styles.textarea
          )}
          placeholder={t("note:NOTE.CREATE.PLACEHOLDER")}
          contentEditable
          dangerouslySetInnerHTML={{ __html: note.description }}
          onInput={(e) => {
            setValue("description", e.currentTarget.textContent as string, {
              shouldValidate: true,
            });
          }}
        />
        <div className="flex justify-between text-xs font-medium dark:text-noteSecondTextDark">
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
          <div
            className="flex items-center gap-0.5"
            title={convertUtcToFullLocalTime(note.updatedAt)}
          >
            <Icon.Update width="16" height="16" />
            <div className="font-normal">{t("common:UPDATED.TIME")}</div>
            <div className="ml-0.5">
              {convertUtcToLocalTime(note.updatedAt)}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
