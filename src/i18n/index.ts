import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh_cn from "./lang/zh-cn.json";
import en from "./lang/en.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    zh_cn: {
      translation: zh_cn,
    },
  },
  lng: "zh_cn",
  fallbackLng: "zh_cn",
  interpolation: {
    escapeValue: false,
  },
});
