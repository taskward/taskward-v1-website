import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./styles.module.css";

import { Icon } from "@components";
import { LanguageType } from "@i18n";

export default function LanguageIcon() {
  const { t, i18n } = useTranslation();

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  function changeLanguage() {
    setShowDropdown(!showDropdown);
    return;
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
    <div className="relative w-34 flex justify-center items-center">
      <div
        className={clsx(
          styles.btnWrapper,
          "py-1 px-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 active:bg-gray-100 dark:active:bg-gray-600 flex justify-center items-center cursor-pointer"
        )}
        onClick={changeLanguage}
      >
        <Icon.Language className="fill-black dark:fill-white" />
        <span className="text-sm ml-1.5">{t("CURRENT.LANGUAGE")}</span>
        <Icon.ArrowDropDown
          className="fill-black dark:fill-white"
          width="24"
          height="24"
        />
      </div>
      <div
        className={clsx(
          showDropdown ? "opacity-100" : "opacity-0",
          "z-10 w-44 bg-white rounded-lg divide-y divide-gray-100 shadow-xl dark:bg-gray-700 dark:divide-gray-600 absolute top-8 left-[-40px] m-auto transition-opacity duration-500"
        )}
      >
        <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
          <div className="font-medium ">Pro User</div>
          <div className="truncate">name@flowbite.com</div>
        </div>
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
        >
          <li>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              中文
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              英文
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              日文
            </a>
          </li>
        </ul>
        <div className="py-1">
          <a
            href="#"
            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            法文
          </a>
        </div>
      </div>
    </div>
  );
}
