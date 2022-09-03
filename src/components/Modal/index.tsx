import { ReactNode, useEffect } from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

import { useDetectOutsideClick } from "@hooks";

export default function Modal({
  children,
  show,
  toggle,
  closeModalCallback,
}: {
  children: ReactNode;
  show: boolean;
  toggle: () => void;
  closeModalCallback: (() => Promise<void>) | (() => void);
}): JSX.Element | null {
  const outsideClickRef = useDetectOutsideClick({
    active: show,
    outsideClickCallback: () => {
      handleCloseModal();
    },
  });

  useEffect(() => {
    if (show) {
      window.addEventListener("keydown", handleOnKeyDownEsc);
      return () => {
        window.removeEventListener("keydown", handleOnKeyDownEsc);
      };
    }
  }, [show]);

  const handleOnKeyDownEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  const handleCloseModal = async () => {
    await closeModalCallback();
    toggle();
  };

  return (
    <div
      className={clsx(
        "hideScrollbar fixed inset-0 z-50 flex h-full w-full overflow-hidden overflow-y-auto bg-gray-900 bg-opacity-60 transition-[visibility]",
        show ? "visible" : "invisible"
      )}
    >
      <div
        ref={outsideClickRef}
        className={clsx(
          "z-[55] my-28 mx-auto h-fit transition-[transform,visibility,opacity]",
          styles.modalWrapper,
          show ? "visible scale-100 opacity-100" : "invisible scale-0 opacity-0"
        )}
      >
        <div className="w-auto rounded-md bg-white p-4 shadow-lg dark:bg-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
}
