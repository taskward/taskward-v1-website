import clsx from "clsx";
import styles from "./styles.module.css";

export default function Header(): JSX.Element {
  return (
    <header
      className={clsx(
        "w-full h-16 border-b border-black p-2 flex content-center justify-between",
        styles.header
      )}
    >
      菜单栏
    </header>
  );
}
