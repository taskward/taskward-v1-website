import jwt_decode from 'jwt-decode'
import { LOCAL_STORAGE_TOKEN } from '@/constants'
import { UserTokenModel } from '@/interfaces'

function validateTokenExpireTime(): boolean {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN)
  if (!accessToken) {
    return false
  }
  const decodedResult: UserTokenModel = jwt_decode(accessToken)
  if (decodedResult.userId <= 0 || !decodedResult.username || !decodedResult.exp) {
    return false
  }
  if (Date.now() >= decodedResult.exp * 1000) {
    return false
  }
  return true
}

export { validateTokenExpireTime }
