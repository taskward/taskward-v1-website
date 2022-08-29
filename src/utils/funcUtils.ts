function setClipBoardText(text: string | undefined): void {
  if (!text) {
    return;
  }
  navigator.clipboard.writeText(text);
}

export { setClipBoardText };
