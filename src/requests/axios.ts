import axios from 'axios'

import { i18n } from '@/i18n'
import { LOCAL_STORAGE_TOKEN } from '@/constants'
import { store, requestAction } from '@/store'

// Axios instance
const axiosService = axios.create({
  baseURL: import.meta.env.VITE_BRUCE_WORLD_BASE_URL,
  withCredentials: false,
  timeout: 30000
})

// Request interceptors
axiosService.interceptors.request.use(
  (config: any) => {
    store.dispatch(requestAction.updateRequestState(true))
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN)
    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptors
axiosService.interceptors.response.use(
  (response) => {
    store.dispatch(requestAction.updateRequestState(false))
    return response
  },
  (error) => {
    if (error.message === 'timeout of 10000ms exceeded') {
      console.error(i18n.t('request:RESPONSE.ERROR.TIMEOUT'))
    } else if (error.response?.status === 401) {
      console.error('401: ' + error.message)
      localStorage.removeItem(LOCAL_STORAGE_TOKEN)
      location.href = '/login'
    } else if (error.response?.status === 400) {
      console.error('400: ' + error.message)
    } else if (error.response?.status === 404) {
      console.error('404: ' + error.message)
      location.href = '/notfound'
    } else {
      console.error(error.message)
    }
    return Promise.reject(error)
  }
)

export { axiosService }
