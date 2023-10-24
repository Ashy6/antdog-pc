import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from '../route/root'
import './global.scss'

function RootApp() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Ele }, index) => (
          <Route
            key={index}
            path={path}
            element={<Ele />}
          ></Route>
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default RootApp
