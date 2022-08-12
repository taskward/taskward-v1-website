import { LoginPopup } from "@components";

export default function Login(): JSX.Element {
  return (
    <div className="absolute inset-x-1/2 inset-y-1/2 m-auto text-center">
      <LoginPopup />
    </div>
  );
}
