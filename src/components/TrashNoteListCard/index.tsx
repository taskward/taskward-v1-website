import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { Icon, NoteListCardPanel, TaskCheckbox } from "@components";
import {
  useDeleteTrashNoteRequest,
  useRestoreTrashNoteRequest,
} from "@requests";
import { convertUtcToLocalTime, convertUtcToFullLocalTime } from "@utils";
import type { TrashNoteListCardProps, Task } from "@interfaces";

export default function TrashNoteListCard({
  note,
  className,
  style,
}: TrashNoteListCardProps): JSX.Element | null {
  const { t } = useTranslation(["common"]);

  const [focused, setFocused] = useState<boolean>(false);

  const { mutate: restoreTrashNote, isLoading: isRestoreTrashNoteLoading } =
    useRestoreTrashNoteRequest();
  const { mutate: deleteTrashNote, isLoading: isDeleteTrashNoteLoading } =
    useDeleteTrashNoteRequest();

  if (!note) {
    return null;
  }

  if (isDeleteTrashNoteLoading || isRestoreTrashNoteLoading) {
    return null;
  }

  return (
    <div
      key={note.id}
      className={clsx(
        "mx-auto flex h-fit w-full flex-col gap-4 rounded-md border border-gray-200 bg-white pt-4 transition-[visibility,opacity] dark:border-neutral-800 dark:bg-noteDark",
        className,
        focused
          ? "drop-shadow-lg dark:drop-shadow-[0_10px_8px_#3a3d41]"
          : "drop-shadow-sm"
      )}
      style={style}
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
      {note.tasks && (
        <div className="flex flex-col gap-1.5 px-4">
          {note.tasks.map((task: Task) => {
            return (
              <TaskCheckbox
                key={task.id}
                checkboxTitle={task.content}
                checked={task.finishedAt !== null}
                linkUrl={task.linkUrl}
              />
            );
          })}
        </div>
      )}
      <div className="flex flex-col px-2 pb-2">
        <div
          className="flex items-center justify-end gap-0.5 px-2 text-xs font-medium dark:text-noteSecondTextDark"
          title={convertUtcToFullLocalTime(note.deletedAt)}
        >
          <Icon.DeleteTime
            width="16"
            height="16"
            className="fill-black dark:fill-white"
          />
          <div className="font-normal">{t("common:DELETED.TIME")}</div>
          <div className="ml-0.5">{convertUtcToLocalTime(note.deletedAt)}</div>
        </div>
        <div
          className={clsx(
            "flex items-center gap-1 transition-[colors,transform,opacity,visibility] duration-500",
            focused
              ? "visible scale-100 opacity-100"
              : "invisible scale-0 opacity-0"
          )}
        >
          <NoteListCardPanel
            focused={focused}
            note={note}
            copy
            restore={restoreTrashNote}
            restoreLoading={isRestoreTrashNoteLoading}
            forceDelete={deleteTrashNote}
            forceDeleteLoading={isDeleteTrashNoteLoading}
          />
        </div>
      </div>
    </div>
  );
}
