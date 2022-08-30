import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import clsx from "clsx";
import styles from "./styles.module.css";

import { Button, Icon } from "@components";
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

  const { mutate: createNote, isLoading } = useCreateNoteRequest();

  const outsideClickRef = useDetectOutsideClick(
    () => {
      onCloseEditable();
    },
    () => {
      setEditable(true);
    }
  );

  const [editable, setEditable] = useState<boolean>(false);

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: yupResolver(NoteFromSchema),
  });

  const handleCreateNote = async (formData: NoteFormData) => {
    createNote(formData, {
      onSuccess: () => {
        onCloseEditable();
      },
    });
  };

  const onCloseEditable = () => {
    setEditable(false);
    reset();
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
                "w-full cursor-text select-text resize-none whitespace-pre-wrap break-words px-0 text-lg font-medium outline-none placeholder:text-gray-500 empty:before:text-gray-500 empty:before:content-[attr(placeholder)] focus:outline-none dark:placeholder-gray-400",
                styles.textarea
              )}
              placeholder={t("common:TITLE")}
              contentEditable
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
              onInput={(e) => {
                setValue("description", e.currentTarget.textContent as string, {
                  shouldValidate: true,
                });
              }}
            />
            <div className="flex items-center justify-between">
              <div
                className={clsx(
                  "block select-none text-xs font-medium text-red-500 transition-opacity duration-500",
                  errors.name ? "visible opacity-100" : "invisible opacity-0"
                )}
              >
                {t("common:TITLE.INVALID")}
              </div>
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
                  type="submit"
                  size="sm"
                  title={t("common:CANCEL")}
                  color="danger"
                  onClick={() => {
                    onCloseEditable();
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
