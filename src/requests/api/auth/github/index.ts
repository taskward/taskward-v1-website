import { store, userAction } from '@/store'
import { axiosService } from '@/requests'
import { LOCAL_STORAGE_TOKEN } from '@/constants'
import { i18n } from '@/i18n'

async function loginByGitHubCode(code: string, abortSignal: AbortSignal): Promise<boolean> {
  try {
    const response = await axiosService({
      method: 'POST',
      url: `auth/github/login?code=${code}`,
      signal: abortSignal
    })
    if (response?.status === 200 && response?.data) {
      if (response.data.accessToken) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken)
      }
      if (response.data.user) {
        store.dispatch(userAction.updateUserInfo(response.data.user))
      }
      return true
    }
    return false
  } catch (error) {
    history.replaceState({ message: i18n.t('request:LOGIN.FAILED') }, '', '/login')
    return false
  }
}

export { loginByGitHubCode }
