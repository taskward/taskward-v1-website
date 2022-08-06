import { useTranslation } from "react-i18next";

export default function Archive(): JSX.Element {
  const { t } = useTranslation();
  return <>{t("SIDEBAR.ARCHIVE")}</>;
}
