import { useEffect, useRef } from "react";

const useOutsideClick = (
  outsideClickCallback?: () => void,
  insideClickCallback?: () => void
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
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
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return ref;
};

export default useOutsideClick;
