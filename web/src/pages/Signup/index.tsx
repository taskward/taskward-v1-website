import { SignupPopup, Loading } from "@components";
import { useImageLoaded } from "@hooks";

import signupBackground from "@assets/background/signup.jpg";

export default function Login(): JSX.Element {
  const loginBackgroundLoaded = useImageLoaded(signupBackground);

  if (!loginBackgroundLoaded) {
    return <Loading fullScreen />;
  }

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center opacity-90"
      style={{ backgroundImage: `url(${signupBackground})` }}
    >
      <div className="absolute inset-0 m-auto h-fit w-fit">
        <SignupPopup />
      </div>
    </div>
  );
}
