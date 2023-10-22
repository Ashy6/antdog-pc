import { AxiosResponse, VITE_CONFIG, request } from "./utils";

export interface LoginParams {
    mail: string
    password: string
}

export function login(options: LoginParams): Promise<AxiosResponse> {
  return request({
    url: `${VITE_CONFIG}/login`,
    method: 'post',
    data: options
  })
}
