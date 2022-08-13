import { LoginPopup } from "@components";

export default function Login(): JSX.Element {
  return (
    <div className="w-screen h-screen relative">
      <div className="inset-0 m-auto w-fit h-fit absolute">
        <LoginPopup />
      </div>
    </div>
  );
}
