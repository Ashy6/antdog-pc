/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { Codes } from './code'
import { LOGIN_URL } from '../route/root'

// export const API_URL = 'https://www.bee456.com'
export const API_URL = 'https://2167d872c4.zicp.fun'
// export const API_URL = '154.212.145.170:9001'

export const VITE_CONFIG = '/api/gcard/web'

export const instance = axios.create({
  // baseURL: API_URL,
  timeout: 40000
})

// 请求拦截器
instance.interceptors.request.use(async (config: any) => {
  // 判断token是否过期
  const token = localStorage.getItem('AntdogToken')
  if (token) {
    config.headers.token = token
  }
  return config
})

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 在这里对返回的响应进行判断和处理
    if (response.status === 200) {
      // 响应状态码为200时，进行一些操作
      if (response.data.code === Codes.ok) {
        // 响应成功后的操作
        return response.data
      }
      if (
        [Codes.notLogin, Codes.unauthorized, Codes.tokenError].includes(
          response.data.code
        )
      ) {
        // 这个项目采用接口请求返回状态码来判断路由
        window.location.href = LOGIN_URL
        return Promise.reject()
      }
    } else {
      // 响应状态码不为200时，进行其他操作
      console.error('请求失败')
    }
    return response.data
  },
  error => {
    // 对请求错误进行处理
    console.error('请求出错', error)
    return Promise.reject(error)
  }
)

export interface RequestDate {
  code?: number
  data?: {
    msg?: string
    [key: string]: AnyObject | any
  }
  msg?: string
  result?: boolean
  timestamp?: number
  tracedId?: string
}

export interface AxiosResponse {
  config: AnyObject
  data: RequestDate
  header: AnyObject
  request: XMLHttpRequest
  status: number
  statusText: string
}
