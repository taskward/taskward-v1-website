import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Icon, Modal } from "@components";

import styles from "./styles.module.css";

export default function EditNoteModal({
  isEdit,
  toggle,
}: {
  isEdit: boolean;
  toggle: () => void;
}): JSX.Element {
  const { t } = useTranslation(["note"]);

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
        className={clsx(
          "min-h-[1.25rem] w-full cursor-text select-text resize-none whitespace-pre-wrap break-words px-0 text-sm font-normal tracking-wide outline-none placeholder:text-gray-500 empty:before:text-gray-500 empty:before:content-[attr(placeholder)] focus:outline-none dark:text-noteSecondTextDark dark:placeholder-gray-400",
          styles.textarea
        )}
        placeholder={t("note:NOTE.CREATE.PLACEHOLDER")}
        contentEditable
        onInput={(e) => {
          // setValue("description", e.currentTarget.textContent as string, {
          //   shouldValidate: true,
          // });
        }}
      />
    </Modal>
  );
}
