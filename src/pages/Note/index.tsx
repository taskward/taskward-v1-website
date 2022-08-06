import { useTranslation } from "react-i18next";

export default function Note(): JSX.Element {
  const { t } = useTranslation();
  return <>{t("SIDEBAR.NOTE")}</>;
}
