import { resources, LanguageType, defaultNs } from ".";

export type I18nStoreType = typeof resources[LanguageType.EN]["app"] &
  typeof resources[LanguageType.EN]["common"] &
  typeof resources[LanguageType.EN]["layout"] &
  typeof resources[LanguageType.EN]["request"] &
  typeof resources[LanguageType.EN]["note"];

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
    resources: typeof resources[LanguageType.EN];
  }
}
