import { RequestDate, VITE_CONFIG, instance } from './utils'

export interface LoginParams {
  mail: string
  password: string
}

export const login = (options: LoginParams): Promise<RequestDate> => {
  return instance({
    url: `${VITE_CONFIG}/login`,
    method: 'post',
    data: options
  })
}
