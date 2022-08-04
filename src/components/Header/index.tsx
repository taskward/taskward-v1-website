import clsx from "clsx";
import styles from "./styles.module.css";
import { Icon } from "..";
import { useTranslation } from "react-i18next";

export default function Header(): JSX.Element {
  const { t, i18n } = useTranslation();

  function changeLanguage() {
    if (i18n.language === "en") {
      i18n.changeLanguage("zh_cn");
    } else {
      i18n.changeLanguage("en");
    }
  }

  return (
    <header
      className={clsx(
        "w-full h-16 border-b border-black p-2 flex content-center items-center justify-between",
        styles.header
      )}
    >
      <div></div>
      <div className="flex flex-col items-center text-xs">
        <div className="cursor-pointer" onClick={changeLanguage}>
          <Icon.Language width="40" height="25" fill="white" />
        </div>
        <div className="px-1 mt-1">{t("CURRENT.LANGUAGE")}</div>
      </div>
    </header>
  );
}
