import { useState } from "react";
import clsx from "clsx";

import { NoteListCardPanel, TaskCheckbox } from "@components";
import {
  useArchiveNoteRequest,
  useDeleteNoteRequest,
  useUnarchiveNoteRequest,
} from "@requests";
import { convertUtcToLocalTime, convertUtcToFullLocalTime } from "@utils";
import { useToggle } from "@hooks";
import { NoteListCardProps, Task } from "@interfaces";

import EditNoteModal from "./EditNoteModal";

export default function NoteListCard({
  note,
  type,
  className,
  style,
}: NoteListCardProps): JSX.Element | null {
  const { mutate: archiveNote, isLoading: isArchiveNoteLoading } =
    useArchiveNoteRequest();
  const { mutate: deleteNote, isLoading: isDeleteNoteLoading } =
    useDeleteNoteRequest(type);
  const { mutate: unarchiveNote, isLoading: isUnarchiveNoteLoading } =
    useUnarchiveNoteRequest();
  const [isEdit, toggleEdit] = useToggle(false);

  const [focused, setFocused] = useState<boolean>(false);

  if (!note) {
    return null;
  }

  if (isArchiveNoteLoading || isDeleteNoteLoading || isUnarchiveNoteLoading) {
    return null;
  }

  return (
    <>
      <div
        key={note.id}
        className={clsx(
          "mx-auto flex h-fit w-full cursor-pointer flex-col gap-4 rounded-md border border-gray-200 bg-white pt-4 transition-[visibility,opacity,transform] dark:border-neutral-800 dark:bg-noteDark",
          className,
          focused
            ? "drop-shadow-lg dark:drop-shadow-[0_10px_8px_#3a3d41]"
            : "drop-shadow-sm",
          isEdit
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
            className="flex items-center justify-end px-2 text-xs font-medium dark:text-noteSecondTextDark"
            title={convertUtcToFullLocalTime(note.createdAt)}
          >
            {convertUtcToLocalTime(note.createdAt)}
          </div>
          {type === "note" && (
            <NoteListCardPanel
              focused={focused}
              note={note}
              copy
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
              copy
              unarchive={unarchiveNote}
              unarchiveLoading={isUnarchiveNoteLoading}
              softDelete={deleteNote}
              softDeleteLoading={isDeleteNoteLoading}
            />
          )}
        </div>
      </div>
      <EditNoteModal
        isEdit={isEdit}
        toggle={toggleEdit}
        note={note}
        type={type}
      />
    </>
  );
}
