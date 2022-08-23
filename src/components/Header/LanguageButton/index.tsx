import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./styles.module.css";

import { Icon } from "@components";
import { LanguageType } from "@i18n";
import { Language } from "@constants";

export default function LanguageIcon() {
  const { t, i18n } = useTranslation();

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const changeLanguage = (language: LanguageType) => {
    setShowDropdown(false);
    switch (language) {
      case LanguageType.ZH_CN:
        i18n.changeLanguage(LanguageType.ZH_CN);
        localStorage.setItem("lang", LanguageType.ZH_CN);
        break;
      case LanguageType.EN:
        i18n.changeLanguage(LanguageType.EN);
        localStorage.setItem("lang", LanguageType.EN);
        break;
      case LanguageType.JA:
        i18n.changeLanguage(LanguageType.JA);
        localStorage.setItem("lang", LanguageType.JA);
        break;
      case LanguageType.FR:
        i18n.changeLanguage(LanguageType.FR);
        localStorage.setItem("lang", LanguageType.FR);
        break;
      default:
        return;
    }
  };

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => {
        setShowDropdown(true);
      }}
      onMouseLeave={() => {
        setShowDropdown(false);
      }}
    >
      <div
        className={clsx(
          styles.btnWrapper,
          "flex w-28 cursor-pointer items-center justify-center rounded-md py-1 pl-1.5 hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600"
        )}
      >
        <Icon.Language
          className="fill-black dark:fill-white"
          width="22"
          height="22"
        />
        <span className="ml-1.5 text-sm">{t("CURRENT.LANGUAGE")}</span>
        <Icon.ArrowDropDown
          className="fill-black dark:fill-white"
          width="22"
          height="22"
        />
      </div>
      <div
        className={clsx(
          showDropdown
            ? "visible translate-y-1  opacity-100"
            : "invisible opacity-0",
          styles.dropdownWrapper,
          "absolute top-7 z-10 w-28 divide-y divide-gray-100 rounded-md bg-white shadow-[rgb(0,0,0,0.2)_0_0_10px] dark:divide-gray-600 dark:bg-gray-700"
        )}
      >
        <ul className="py-1 text-center text-sm text-gray-700 dark:text-gray-200">
          <li className="px-1.5 py-0.5">
            <span
              className={clsx(
                i18n.language === LanguageType.ZH_CN
                  ? "bg-gray-200 text-emerald-600 dark:bg-gray-500"
                  : "hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600",
                "block cursor-pointer rounded-md py-1  px-2 transition-colors"
              )}
              onClick={() => {
                changeLanguage(LanguageType.ZH_CN);
              }}
            >
              {Language.SIMPLIFY_CHINESE}
            </span>
          </li>
          <li className="px-1.5 py-0.5">
            <span
              className={clsx(
                i18n.language === LanguageType.EN
                  ? "bg-gray-200 text-emerald-600 dark:bg-gray-500"
                  : "hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600",
                "block cursor-pointer rounded-md py-1  px-2 transition-colors"
              )}
              onClick={() => {
                changeLanguage(LanguageType.EN);
              }}
            >
              {Language.ENGLISH}
            </span>
          </li>
          <li className="px-1.5 py-0.5">
            <span
              className={clsx(
                i18n.language === LanguageType.JA
                  ? "bg-gray-200 text-emerald-600 dark:bg-gray-500"
                  : "hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600",
                "block cursor-pointer rounded-md py-1  px-2 transition-colors"
              )}
              onClick={() => {
                changeLanguage(LanguageType.JA);
              }}
            >
              {Language.JAPANESE}
            </span>
          </li>
          <li className="px-1.5 py-0.5">
            <span
              className={clsx(
                i18n.language === LanguageType.FR
                  ? "bg-gray-200 text-emerald-600 dark:bg-gray-500"
                  : "hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600",
                "block cursor-pointer rounded-md py-1  px-2 transition-colors"
              )}
              onClick={() => {
                changeLanguage(LanguageType.FR);
              }}
            >
              {Language.FRENCH}
            </span>
          </li>
        </ul>
        {/* <div className="py-1">
          <span
            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
          </span>
        </div> */}
      </div>
    </div>
  );
}
