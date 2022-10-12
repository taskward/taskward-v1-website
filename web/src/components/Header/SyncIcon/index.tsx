import { Icon } from "@components";
import { useAppSelector } from "@hooks";

export default function SyncIcon(): JSX.Element | null {
  const isLoading = useAppSelector((state) => state.request.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="select-none rounded-full p-2 transition-colors">
      <Icon.Sync />
    </div>
  );
}
