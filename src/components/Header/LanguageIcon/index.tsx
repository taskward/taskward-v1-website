import { useTranslation } from "react-i18next";
import { Icon } from "@components";

export default function LanguageIcon() {
  const { i18n } = useTranslation();

  function changeLanguage() {
    switch (i18n.language) {
      case "zh_cn":
        i18n.changeLanguage("en");
        break;
      case "en":
        i18n.changeLanguage("ja");
        break;
      case "ja":
        i18n.changeLanguage("fr");
        break;
      case "fr":
        i18n.changeLanguage("zh_cn");
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
