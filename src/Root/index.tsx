/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import routes, { LOGIN_URL } from '../route/root'
import './global.scss'

function RootApp () {
  // 这里设置默认值 false 代表未登录的页面
  const [isLoggedIn, _setIsLoggedIn] = useState(false)

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
