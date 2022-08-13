import { APPLICATION_NAME } from "./constants";

function isDarkMode(): boolean {
  return document.documentElement.classList.contains("dark");
}

function initialThemeMode() {
  const darkModeFromStorage: string | null =
    window.localStorage.getItem("theme");
  switch (darkModeFromStorage) {
    case "dark":
      document.documentElement.classList.add("dark");
    case "light":
    case null:
    default:
      return;
  }
}

function getDocumentTitle(prefix: string): string {
  if (!prefix) {
    return APPLICATION_NAME;
  }
  return prefix + " | " + APPLICATION_NAME;
}

export { isDarkMode, initialThemeMode, getDocumentTitle };
