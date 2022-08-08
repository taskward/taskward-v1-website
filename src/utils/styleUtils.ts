import { APPLICATION_NAME } from "./constants";

function isDarkMode(): boolean {
  return document.documentElement.className.includes("dark");
}

function getDocumentTitle(prefix: string): string {
  if (!prefix) {
    return APPLICATION_NAME;
  }
  return prefix + " | " + APPLICATION_NAME;
}

export { isDarkMode, getDocumentTitle };
