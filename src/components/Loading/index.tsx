import { Icon } from "@components";

export default function Loading({
  fullScreen = false,
}: {
  fullScreen?: boolean;
}): JSX.Element {
  if (fullScreen) {
    return (
      <div className="w-screen h-screen">
        <div className="w-full h-full flex justify-center items-center">
          <Icon.Loading width="36" height="36" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Icon.Loading width="36" height="36" />
    </div>
  );
}
