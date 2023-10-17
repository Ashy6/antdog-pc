import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import routes, { LOGIN_URL } from '../route/root'
import './global.scss'

function RootApp () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, _setIsLoggedIn] = useState(true)

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Ele }, index) => (
          <Route
            key={index}
            path={path}
            element={
              isLoggedIn || path === LOGIN_URL ? (
                <Ele></Ele>
              ) : (
                <Navigate to={LOGIN_URL} />
              )
            }
          ></Route>
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default RootApp
