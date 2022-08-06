import { resources, LanguageType } from ".";

export type I18nStoreType = typeof resources[LanguageType.ZH_CN];

export type I18nT = {
  (key: keyof I18nStoreType): string;
};

declare module "i18next" {
  interface TFunction extends I18nT {}
}

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: typeof resources[LanguageType.ZH_CN];
  }
}
