import { useEffect, useRef } from "react";

import { OutsideClickType } from "@interfaces";

const useOutsideClick = ({
  outsideClickCallback,
  insideClickCallback,
  active = true,
}: OutsideClickType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>();

  useEffect(() => {
    if (active) {
      const handleClick = (event: MouseEvent) => {
        event.stopPropagation();
        if (ref.current && !ref.current.contains(event.target)) {
          if (outsideClickCallback) {
            outsideClickCallback();
          }
        } else {
          if (insideClickCallback) {
            insideClickCallback();
          }
        }
      };
      document.addEventListener("mousedown", handleClick, true);
      return () => {
        document.removeEventListener("mousedown", handleClick, true);
      };
    }
  }, [ref, active]);

  return ref;
};

export default useOutsideClick;
