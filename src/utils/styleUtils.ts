import { APPLICATION_NAME } from '@/constants'

// 获取浏览器文档的 Title
function getDocumentTitle(prefix: string): string {
  if (!prefix) {
    return APPLICATION_NAME
  }
  return prefix + ' | ' + APPLICATION_NAME
}

export { getDocumentTitle }
