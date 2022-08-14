import { resources, LanguageType, defaultNs } from ".";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNs;
    resources: typeof resources[LanguageType.EN];
  }
}
