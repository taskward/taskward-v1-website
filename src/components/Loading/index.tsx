import { Icon } from "@components";

export default function Loading({
  fullScreen = false,
}: {
  fullScreen?: boolean;
}): JSX.Element {
  if (fullScreen) {
    return (
      <div className="h-screen w-screen">
        <div className="flex h-full w-full items-center justify-center">
          <Icon.Loading width="36" height="36" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Icon.Loading width="36" height="36" />
    </div>
  );
}
