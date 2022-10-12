import { useState } from "react";

const useToggle = (initialValue = false): [boolean, () => void] => {
  const [active, setActive] = useState<boolean>(initialValue);

  const toggle = () => {
    setActive(!active);
  };

  return [active, toggle];
};

export default useToggle;
