import { AxiosResponse, VITE_CONFIG, instance } from "./utils";

export interface LoginParams {
    mail: string
    password: string
}

export function login(options: LoginParams): Promise<AxiosResponse> {
  return instance({
    url: `${VITE_CONFIG}/login`,
    method: 'post',
    data: options
  })
}
