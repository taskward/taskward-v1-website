import { Icon } from "@components";
import { LoadingProps } from "@interfaces";

export default function Loading({
  fullScreen = false,
  width = "36",
  height = "36",
}: LoadingProps): JSX.Element {
  if (fullScreen) {
    return (
      <div className="h-screen w-screen">
        <div className="flex h-full w-full items-center justify-center">
          <Icon.Loading width={width} height={height} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Icon.Loading width={width} height={height} />
    </div>
  );
}
