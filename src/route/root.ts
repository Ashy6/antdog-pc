import { Login } from '../views/Login'
import { Manage } from '../views/Manage'

interface RootRoutes {
  path: string
  Ele: () => JSX.Element
}

export const MANAGE_URL = '/'
export const LOGIN_URL = '/login'

const routes: RootRoutes[] = [
  {
    path: MANAGE_URL,
    Ele: Manage
  },
  {
    path: LOGIN_URL,
    Ele: Login
  }
]

export default routes
