import { v4 as uuidv4 } from "uuid";
function setClipBoardText(text: string | undefined | null): boolean {
  if (!text) {
    return false;
  }
  navigator.clipboard.writeText(text);
  return true;
}

function isObjectHaveSameData(a: object, b: object) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function generateGUID(): string {
  return uuidv4();
}

export { setClipBoardText, isObjectHaveSameData, generateGUID };
