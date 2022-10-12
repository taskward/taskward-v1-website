import { resources, LanguageType, defaultNs } from ".";

export type I18nStoreType = typeof resources[LanguageType.ZH_CN]["app"] &
  typeof resources[LanguageType.ZH_CN]["common"] &
  typeof resources[LanguageType.ZH_CN]["layout"] &
  typeof resources[LanguageType.ZH_CN]["request"] &
  typeof resources[LanguageType.ZH_CN]["note"];

export type I18nT = {
  (key: I18nStoreType): string;
};

declare module "i18next" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TFunction extends I18nT {}
}

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNs;
    resources: typeof resources[LanguageType.ZH_CN];
  }
}
