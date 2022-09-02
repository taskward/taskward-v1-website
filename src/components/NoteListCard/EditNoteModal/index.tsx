import clsx from "clsx";
import { Icon, Modal } from "@components";

export default function EditNoteModal({
  isEdit,
  toggle,
}: {
  isEdit: boolean;
  toggle: () => void;
}): JSX.Element | null {
  return (
    <Modal show={isEdit} toggle={toggle}>
      <div className="flex items-center justify-end dark:border-gray-600">
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
      <div
        className="block max-h-[600px] min-h-[200px] overflow-x-hidden overflow-y-scroll whitespace-pre-wrap break-words text-sm font-normal tracking-wide dark:text-noteSecondTextDark"
        style={{ overflow: "overlay" }}
      ></div>
    </Modal>
  );
}
