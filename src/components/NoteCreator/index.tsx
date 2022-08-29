import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import clsx from "clsx";
import styles from "./styles.module.css";

import { Button } from "@components";
import {
  CustomComponentProps,
  type NoteFormData,
  NoteFromSchema,
} from "@interfaces";
import { useDetectOutsideClick } from "@hooks";
import { useCreateNoteRequest } from "@requests";

export default function NoteCreator({
  style,
  className,
}: CustomComponentProps): JSX.Element {
  const { t } = useTranslation(["common", "note"]);

  const { mutate: createNote } = useCreateNoteRequest();

  const outsideClickRef = useDetectOutsideClick(
    () => {
      onCloseEditable();
    },
    () => {
      setEditable(true);
    }
  );

  const [editable, setEditable] = useState<boolean>(false);

  const { register, handleSubmit, setValue, reset } = useForm<NoteFormData>({
    resolver: yupResolver(NoteFromSchema),
  });

  const handleCreateNote = async (formData: NoteFormData) => {
    createNote(formData, {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSuccess: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onError: () => {},
    });
  };

  const onCloseEditable = () => {
    setEditable(false);
    //handleSubmit(handleCreateNote)();
    reset();
  };

  return (
    <div
      className={clsx(
        "mx-auto shrink-0 rounded-lg border bg-white p-4 ring-0 drop-shadow-lg",
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
            <input
              className="w-full transform font-medium placeholder:text-gray-500 focus:outline-none dark:placeholder-gray-400"
              placeholder={t("common:TITLE")}
              required
              autoComplete="off"
              {...register("name")}
            />
            <div
              className={clsx(
                "min-h-[1.25rem] w-full cursor-text select-text resize-none whitespace-pre-wrap break-words bg-white px-0 text-sm font-medium outline-none placeholder:text-gray-500 empty:before:text-gray-500 empty:before:content-[attr(placeholder)] focus:outline-none dark:bg-gray-800 dark:placeholder-gray-400",
                styles.textarea
              )}
              placeholder={t("note:NOTE.CREATE.PLACEHOLDER")}
              contentEditable
              onInput={(e) => {
                setValue("description", e.currentTarget.textContent as string, {
                  shouldValidate: true,
                });
              }}
            />
            <Button type="submit" size="md" title="创建" />
          </>
        ) : (
          <input
            className="w-full font-medium placeholder:text-gray-500 focus:outline-none dark:placeholder-gray-400"
            placeholder={t("note:NOTE.CREATE.PLACEHOLDER")}
          />
        )}
      </form>
    </div>
  );
}
