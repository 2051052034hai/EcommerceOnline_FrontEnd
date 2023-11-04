import axios from 'axios'
import Cookies from 'js-cookie'
import cookie from 'react-cookies'

const axiosInstance = axios.create({
  // baseURL: 'https://ecommerceht.onrender.com/v1/api/',
  baseURL: 'http://localhost:8000/v1/api/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('access-token')

  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config
    if (error.response && error.response.status === 419) {
      try {
        const result = await axiosInstance.post(
          'https://ecommerceht.onrender.com/v1/api/user/refresh',
          {
            refresh: Cookies.get('refresh_token'),
          },
        )

        const { access_token, refresh_token } = result.data
        cookie.save('access-token', access_token)
        cookie.save('refresh_token', refresh_token)
        originalConfig.headers.Authorization = `Bearer ${access_token}`
      } catch (error) {
        if (error) cookie.remove('access-token')
        cookie.remove('refresh_token')
        window.location.path = '/login'
      }
      return Promise.reject(error)
    }
  },
)

const get = (url, config) => {
  return axiosInstance.get(url, config)
}

const create = (url, data, config) => {
  return axiosInstance.post(url, data, config)
}

const update = (url, data, config) => {
  return axiosInstance.put(url, data, config)
}

const remove = (url, config) => {
  return axiosInstance.delete(url, config)
}

const updateMany = (url, data, config) => {
  return axiosInstance.patch(url, data, config)
}

export { get, create, update, remove, updateMany }
