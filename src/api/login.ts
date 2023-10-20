import { request } from "./utils";

export interface LoginParams {
    mail: string
    password: string
}

export function login(options: LoginParams): Promise<AnyObject> {
  return request({
    url: '/login',
    method: 'post',
    data: options
  })
}
