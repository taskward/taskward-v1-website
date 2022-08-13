import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import taskward from "../../assets/img/taskward.png";

export default function Home(): JSX.Element {
  return (
    <div
      className={clsx(
        styles.background,
        "w-screen h-screen flex justify-center items-center"
      )}
    >
      <div className="basis-1/5 bg-slate-400 w-1/5 h-1/3">
        <Link to="/note">
          <h1 className="bg-white w-fit cursor-pointer rounded-md p-2 whitespace-nowrap hover:bg-slate-300">
            Go to notes
          </h1>
        </Link>
        <Link to="/login">
          <h1 className="bg-white w-fit cursor-pointer rounded-md p-2 whitespace-nowrap hover:bg-slate-300">
            Login
          </h1>
        </Link>
      </div>
    </div>
  );
}
