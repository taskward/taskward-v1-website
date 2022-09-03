import { ReactNode } from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

import { useDetectOutsideClick } from "@hooks";

export default function Modal({
  children,
  show,
  toggle,
}: {
  children: ReactNode;
  show: boolean;
  toggle: () => void;
}): JSX.Element | null {
  const outsideClickRef = useDetectOutsideClick({
    active: show,
    outsideClickCallback: () => {
      toggle();
    },
  });

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex h-full w-full overflow-hidden bg-gray-900 bg-opacity-60 transition-[visibility]",
        show ? "visible" : "invisible"
      )}
    >
      <div
        ref={outsideClickRef}
        className={clsx(
          "z-[55] m-auto h-fit transition-[transform,visibility,opacity]",
          styles.modalWrapper,
          show ? "visible scale-100 opacity-100" : "invisible scale-0 opacity-0"
        )}
      >
        <div className="mb-60 w-auto rounded-md bg-white p-4 shadow-lg dark:bg-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
}
