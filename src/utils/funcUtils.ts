function setClipBoardText(text: string | undefined | null): boolean {
  if (!text) {
    return false;
  }
  navigator.clipboard.writeText(text);
  return true;
}

export { setClipBoardText };
