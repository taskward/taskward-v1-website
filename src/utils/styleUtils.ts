function isDarkMode(): boolean {
  return document.documentElement.className.includes("dark");
}

export { isDarkMode };
