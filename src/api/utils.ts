import axios from 'axios'

export const API_URL = 'https://2167d872c4.zicp.fun/gcard/web/'

export const request = axios.create({
  baseURL: API_URL,
  timeout: 40000
})
