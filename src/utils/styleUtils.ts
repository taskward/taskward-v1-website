import { APPLICATION_NAME } from "@constants";

function getDocumentTitle(prefix: string): string {
  if (!prefix) {
    return APPLICATION_NAME;
  }
  return prefix + " | " + APPLICATION_NAME;
}

export { getDocumentTitle };
