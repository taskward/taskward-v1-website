import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  zh_cn_app,
  zh_cn_common,
  zh_cn_layout,
  zh_cn_request,
} from "./lang/zh-cn";
import { en_app, en_common, en_layout, en_request } from "./lang/en";
import { ja_app, ja_common, ja_layout, ja_request } from "./lang/ja";
import { fr_app, fr_common, fr_layout, fr_request } from "./lang/fr";

enum LanguageType {
  ZH_CN = "zh_cn",
  EN = "en",
  JA = "ja",
  FR = "fr",
}

const resources = {
  [LanguageType.EN]: {
    app: en_app,
    common: en_common,
    layout: en_layout,
    request: en_request,
  },
  [LanguageType.ZH_CN]: {
    app: zh_cn_app,
    common: zh_cn_common,
    layout: zh_cn_layout,
    request: zh_cn_request,
  },
  [LanguageType.JA]: {
    app: ja_app,
    common: ja_common,
    layout: ja_layout,
    request: ja_request,
  },
  [LanguageType.FR]: {
    app: fr_app,
    common: fr_common,
    layout: fr_layout,
    request: fr_request,
  },
};

const defaultNs = "common";

i18n.use(initReactI18next).init({
  defaultNS: defaultNs,
  ns: ["app", "common", "layout", "request"],
  resources: resources,
  lng: localStorage.getItem("lang") ?? LanguageType.EN,
  fallbackLng: LanguageType.EN,
  interpolation: {
    escapeValue: false,
  },
});

export { i18n, defaultNs, resources, LanguageType };
