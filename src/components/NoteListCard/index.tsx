import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { NoteListCardPanel, TaskCheckbox, Icon } from "@components";
import {
  useArchiveNoteRequest,
  useDeleteNoteRequest,
  useUnarchiveNoteRequest,
  useDeleteTrashNoteRequest,
  useRestoreTrashNoteRequest,
} from "@requests";
import { convertUtcToLocalTime, convertUtcToFullLocalTime } from "@utils";
import { useToggle, useCopyText } from "@hooks";
import type { NoteListCardProps, Task } from "@interfaces";

import EditNoteModal from "./EditNoteModal";

export default function NoteListCard({
  note,
  type,
  editable,
  className,
  style,
}: NoteListCardProps): JSX.Element | null {
  const { t } = useTranslation(["common"]);

  const { mutate: archiveNote, isLoading: isArchiveNoteLoading } =
    useArchiveNoteRequest();
  const { mutate: deleteNote, isLoading: isDeleteNoteLoading } =
    useDeleteNoteRequest(type);
  const { mutate: unarchiveNote, isLoading: isUnarchiveNoteLoading } =
    useUnarchiveNoteRequest();
  const { mutate: restoreTrashNote, isLoading: isRestoreTrashNoteLoading } =
    useRestoreTrashNoteRequest();
  const { mutate: deleteTrashNote, isLoading: isDeleteTrashNoteLoading } =
    useDeleteTrashNoteRequest();

  const copyText = useCopyText();
  const [isEdit, toggleEdit] = useToggle(false);

  const [focused, setFocused] = useState<boolean>(false);

  if (!note) {
    return null;
  }

  if (
    isArchiveNoteLoading ||
    isDeleteNoteLoading ||
    isUnarchiveNoteLoading ||
    isDeleteTrashNoteLoading ||
    isRestoreTrashNoteLoading
  ) {
    return null;
  }

  return (
    <>
      <div
        className={clsx(
          "mx-auto flex h-fit w-full cursor-pointer flex-col gap-4 rounded-md border border-gray-200 bg-white pt-4 transition-[visibility,opacity,transform] dark:border-neutral-800 dark:bg-noteDark",
          className,
          focused
            ? "drop-shadow-lg dark:drop-shadow-[0_10px_8px_#3a3d41]"
            : "drop-shadow-sm",
          isEdit && editable
            ? "invisible scale-0 opacity-0"
            : "visible scale-100 opacity-100"
        )}
        style={style}
        onClick={() => {
          toggleEdit();
          setFocused(false);
        }}
        onMouseEnter={() => {
          setFocused(true);
        }}
        onMouseLeave={() => {
          setFocused(false);
        }}
      >
        {note.name && (
          <div className="block truncate px-4 text-lg font-medium">
            {note.name}
          </div>
        )}
        {note.description && (
          <p
            className="block whitespace-pre-wrap break-words px-4 text-sm font-normal tracking-wide dark:text-noteSecondTextDark"
            dangerouslySetInnerHTML={{ __html: note.description }}
          />
        )}
        {note.tasks && note.tasks.length > 0 && (
          <div className="flex flex-col gap-1.5 px-4">
            {note.tasks.map((task: Task) => {
              return (
                <TaskCheckbox
                  key={task.id}
                  task={task}
                  noteType={type}
                  copyLinkUrl={() => {
                    copyText(task.linkUrl, t("common:COPY.SUCCESS"));
                  }}
                />
              );
            })}
          </div>
        )}
        <div className="flex flex-col px-2 pb-2">
          {type === "trash" ? (
            note.deletedAt && (
              <div className="flex justify-end px-2">
                <div
                  className="flex w-fit items-center gap-0.5 text-xs font-medium dark:text-noteSecondTextDark"
                  title={convertUtcToFullLocalTime(note.deletedAt)}
                >
                  <Icon.DeleteTime
                    width="16"
                    height="16"
                    className="fill-black dark:fill-white"
                  />
                  <div className="font-normal">{t("common:DELETED.TIME")}</div>
                  <div className="ml-0.5">
                    {convertUtcToLocalTime(note.deletedAt)}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div
              className="flex items-center justify-end px-2 text-xs font-medium dark:text-noteSecondTextDark"
              title={convertUtcToFullLocalTime(note.createdAt)}
            >
              {convertUtcToLocalTime(note.createdAt)}
            </div>
          )}
          {type === "note" && (
            <NoteListCardPanel
              focused={focused}
              note={note}
              copy={() => {
                copyText(note.description, t("common:COPY.SUCCESS"));
              }}
              archive={archiveNote}
              archiveLoading={isArchiveNoteLoading}
              softDelete={deleteNote}
              softDeleteLoading={isDeleteNoteLoading}
            />
          )}
          {type === "archive" && (
            <NoteListCardPanel
              focused={focused}
              note={note}
              copy={() => {
                copyText(note.description, t("common:COPY.SUCCESS"));
              }}
              unarchive={unarchiveNote}
              unarchiveLoading={isUnarchiveNoteLoading}
              softDelete={deleteNote}
              softDeleteLoading={isDeleteNoteLoading}
            />
          )}
          {type === "trash" && (
            <NoteListCardPanel
              focused={focused}
              note={note}
              copy={() => {
                copyText(note.description, t("common:COPY.SUCCESS"));
              }}
              restore={restoreTrashNote}
              restoreLoading={isRestoreTrashNoteLoading}
              forceDelete={deleteTrashNote}
              forceDeleteLoading={isDeleteTrashNoteLoading}
            />
          )}
        </div>
      </div>
      {editable && (
        <EditNoteModal
          isEdit={isEdit}
          toggle={toggleEdit}
          note={note}
          type={type}
        />
      )}
    </>
  );
}
