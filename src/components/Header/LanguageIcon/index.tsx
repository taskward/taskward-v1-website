import { useTranslation } from "react-i18next";
import { Icon } from "@components";
import { LanguageType } from "@i18n";

export default function LanguageIcon() {
  const { i18n } = useTranslation();

  function changeLanguage() {
    switch (i18n.language) {
      case LanguageType.ZH_CN:
        i18n.changeLanguage(LanguageType.EN);
        localStorage.setItem("lang", LanguageType.EN);
        break;
      case LanguageType.EN:
        i18n.changeLanguage(LanguageType.JA);
        localStorage.setItem("lang", LanguageType.JA);
        break;
      case LanguageType.JA:
        i18n.changeLanguage(LanguageType.FR);
        localStorage.setItem("lang", LanguageType.FR);
        break;
      case LanguageType.FR:
        i18n.changeLanguage(LanguageType.ZH_CN);
        localStorage.setItem("lang", LanguageType.ZH_CN);
        break;
      default:
        return;
    }
  }

  return (
    <div
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 active:bg-gray-100 dark:active:bg-gray-600 flex justify-center items-center cursor-pointer transition-colors"
      onClick={changeLanguage}
    >
      <Icon.Language className="fill-black dark:fill-white" />
    </div>
  );
}
