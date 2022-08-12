import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Home(): JSX.Element {
  const client_id = "a0ba39a21f70a221a955";

  const authorize_uri = "https://github.com/login/oauth/authorize";
  const redirect_uri = "http://localhost:8080/auth/github/redirect";
  return (
    <div className={clsx(styles.background, "w-screen h-screen")}>
      Home
      <div className="absolute inset-x-1/2 inset-y-1/2 m-auto text-center">
        <Link to="/note">
          <h1 className="bg-white w-fit cursor-pointer rounded-md p-2 whitespace-nowrap hover:bg-slate-300">
            Go to notes
          </h1>
        </Link>
        <a
          href={`${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`}
          target="_blank"
        >
          GitHub Login
        </a>
        <div className="whitespace-nowrap">This is a temporary page.</div>
      </div>
    </div>
  );
}
