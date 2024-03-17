import { v4 as uuidv4 } from 'uuid'

// 复制文本
function setClipBoardText(text: string | undefined | null): boolean {
  if (!text) {
    return false
  }
  navigator.clipboard.writeText(text)
  return true
}

// 判断两个对象是否相等
function isObjectHaveSameData(a: object, b: object) {
  return JSON.stringify(a) === JSON.stringify(b)
}

// 生成 GUID
function generateGUID(): string {
  return uuidv4()
}

// 根据链接打开新标签页
function openWindow(url: string): void {
  const w: Window | null = window.open('about:blank')
  if (w) {
    w.opener = null
    w.location.href = url
  }
  return
}

export { setClipBoardText, isObjectHaveSameData, generateGUID, openWindow }
