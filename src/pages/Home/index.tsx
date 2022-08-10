import clsx from "clsx";
import styles from "./styles.module.css";

export default function Home(): JSX.Element {
  return (
    <div className={clsx(styles.background, "w-screen h-screen")}>Home</div>
  );
}
