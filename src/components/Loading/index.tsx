import { Icon } from "@components";
import clsx from "clsx";

export default function Loading({
  fullScreen = false,
}: {
  fullScreen?: boolean;
}): JSX.Element {
  return (
    <div className={clsx("w-screen h-screen hide", !fullScreen && "hidden")}>
      <div className="w-full h-full flex justify-center items-center">
        <Icon.Loading width="36" height="36" />
      </div>
    </div>
  );
}
