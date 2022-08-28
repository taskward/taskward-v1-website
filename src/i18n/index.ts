import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  zh_cn_app,
  zh_cn_common,
  zh_cn_layout,
  zh_cn_request,
  zh_cn_note,
} from "./lang/zh-cn";
import { en_app, en_common, en_layout, en_request, en_note } from "./lang/en";
import { ja_app, ja_common, ja_layout, ja_request, ja_note } from "./lang/ja";
import { fr_app, fr_common, fr_layout, fr_request, fr_note } from "./lang/fr";

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
    note: en_note,
  },
  [LanguageType.ZH_CN]: {
    app: zh_cn_app,
    common: zh_cn_common,
    layout: zh_cn_layout,
    request: zh_cn_request,
    note: zh_cn_note,
  },
  [LanguageType.JA]: {
    app: ja_app,
    common: ja_common,
    layout: ja_layout,
    request: ja_request,
    note: ja_note,
  },
  [LanguageType.FR]: {
    app: fr_app,
    common: fr_common,
    layout: fr_layout,
    request: fr_request,
    note: fr_note,
  },
};

const defaultNs = "common";

i18n.use(initReactI18next).init({
  defaultNS: defaultNs,
  ns: ["app", "common", "layout", "request", "note"],
  resources: resources,
  lng: localStorage.getItem("lang") ?? LanguageType.EN,
  fallbackLng: LanguageType.EN,
  interpolation: {
    escapeValue: false,
  },
});

export { i18n, defaultNs, resources, LanguageType };
