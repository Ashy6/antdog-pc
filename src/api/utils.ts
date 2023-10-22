/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

export const API_URL = 'https://www.bee456.com'
// export const API_URL = 'https://2167d872c4.zicp.fun'
// export const API_URL = '154.212.145.170:9001'

export const VITE_CONFIG = '/gcard/web'

export const request = axios.create({
  baseURL: API_URL,
  timeout: 40000
})

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