import { LoginPopup, Loading } from "@components";
import { useImageLoaded } from "@hooks";

import loginBackground from "@assets/background/login.png";

export default function Login(): JSX.Element {
  const loginBackgroundLoaded = useImageLoaded(loginBackground);

  if (!loginBackgroundLoaded) {
    return <Loading fullScreen />;
  }

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="absolute inset-0 m-auto h-fit w-fit">
        <LoginPopup />
      </div>
    </div>
  );
}
