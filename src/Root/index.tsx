/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import routes, { LOGIN_URL } from '../route/root'
import './global.scss'

function RootApp() {
  // 这里设置默认值 false 代表未登录的页面

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
