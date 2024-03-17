import { useAppSelector, useAppDispatch } from '@/hooks'
import { notificationAction } from '@/store'
import { setClipBoardText } from '@/utils'

const useCopyText = (): ((
  text: string | undefined | null,
  notificationText: string | undefined | null
) => void) => {
  const show = useAppSelector((state) => state.notification.show)
  const timeout = useAppSelector((state) => state.notification.timeout)
  const dispatch = useAppDispatch()

  const copyText = (
    text: string | undefined | null,
    notificationText: string | undefined | null
  ) => {
    const copyResult = setClipBoardText(text)
    if (copyResult) {
      if (show) {
        dispatch(notificationAction.hide())
        if (timeout) {
          dispatch(notificationAction.clearTimeout())
          clearTimeout(timeout)
        }
        setTimeout(() => {
          addNewNotification(notificationText)
        }, 300)
      } else {
        addNewNotification(notificationText)
      }
    }
  }

  const addNewNotification = (text: string | undefined | null) => {
    dispatch(notificationAction.show())
    dispatch(notificationAction.changeText(text))
    const timeoutInstance = setTimeout(() => {
      dispatch(notificationAction.hide())
    }, 3000)
    dispatch(notificationAction.addTimeout(timeoutInstance))
  }

  return copyText
}

export default useCopyText
