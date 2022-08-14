import { LoginPopup, Loading } from "@components";
import loginBackground from "@assets/background/login.png";
import { useImageLoaded } from "@hooks";

export default function Login(): JSX.Element {
  const loginBackgroundLoaded = useImageLoaded(loginBackground);

  if (!loginBackgroundLoaded) {
    return <Loading fullScreen />;
  }

  return (
    <div
      className="w-screen h-screen relative bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="inset-0 m-auto w-fit h-fit absolute">
        <LoginPopup />
      </div>
    </div>
  );
}
