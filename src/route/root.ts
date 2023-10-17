import { Empty } from '../components/Empty'
import { Login } from '../views/Login'
import { Manage } from '../views/Manage'

interface RootRoutes {
  path: string
  Ele: () => JSX.Element
}

export const LOGIN_URL = '/login'
export const MANAGE_URL = '/manage'

const routes: RootRoutes[] = [
  {
    path: '/',
    Ele: Empty
  },
  {
    path: MANAGE_URL,
    Ele: Manage
  },
  {
    path: LOGIN_URL,
    Ele: Login
  },
]

export default routes
