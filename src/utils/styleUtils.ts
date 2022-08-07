import { DOCUMENT_TITLE_SUFFIX } from "./constants";

function isDarkMode(): boolean {
  return document.documentElement.className.includes("dark");
}

function getDocumentTitle(prefix: string): string {
  if (!prefix) {
    return DOCUMENT_TITLE_SUFFIX;
  }
  return prefix + " | " + DOCUMENT_TITLE_SUFFIX;
}

export { isDarkMode, getDocumentTitle };
