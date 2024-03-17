import axios from "axios"

const BASE_PORT = 3001
export const BASE_URL = `http://192.168.0.104:${BASE_PORT}`

export const authAxios = axios.create({
  baseURL: `${BASE_URL}/api/auth/`,
  headers: {
    "Content-Type": "application/json",
  },
})
export const $axios = axios.create({
  baseURL: `${BASE_URL}/api/`,
})
authAxios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token")
        delete authAxios.defaults.headers.common["Authorization"]
      }
    }
    return error.response
  },
)
authAxios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token")
  return config
})
$axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token")
        delete authAxios.defaults.headers.common["Authorization"]
      }
    }
    return error.response
  },
)
$axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token")
  return config
})
