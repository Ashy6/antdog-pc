import { Login } from '../views/Login'
import { Manage } from '../views/Manage'

interface RootRoutes {
  path: string
  Ele: () => JSX.Element
}

export const LOGIN_URL = '/login'
export const MANAGE_URL = '/'

const routes: RootRoutes[] = [
  {
    path: MANAGE_URL,
    Ele: () => <Manage></Manage>
  },
  {
    path: LOGIN_URL,
    Ele: () => <Login></Login>
  }
]

export default routes
