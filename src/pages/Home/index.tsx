import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Home(): JSX.Element {
  return (
    <div className={clsx(false && styles.background, "w-screen h-screen")}>
      Home
      <div className="absolute inset-x-1/2 inset-y-1/2 m-auto text-center">
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
        <div className="whitespace-nowrap">This is a temporary page.</div>
      </div>
    </div>
  );
}
