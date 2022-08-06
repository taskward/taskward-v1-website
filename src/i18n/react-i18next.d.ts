import { resources, LanguageType } from ".";

type I18nStoreType = typeof resources[LanguageType.ZH_CN]["translation"];

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
