import { useTranslation } from "react-i18next";

export default function Trash(): JSX.Element {
  const { t } = useTranslation();
  return <>{t("SIDEBAR.TRASH")}</>;
}
