import { Icon } from "@components";

export default function Loading(): JSX.Element {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Icon.Loading width="36" height="36" />
    </div>
  );
}
