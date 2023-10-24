import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import routes from '../route/root'
import './global.scss'

function RootApp() {
  return (
    <ConfigProvider
      theme={{
        components: {
          // 定制组件主题色
          Pagination: {
            itemActiveBg: '#1ff4fe',
            itemInputBg: 'linear-gradient(#f9f9f9, #cdcdd8)',
            itemBg: '#f9f9f9',
            // itemInputBg: '#cdcdd8',
            // miniOptionsSizeChangerTop: 10,
            itemLinkBg: '#f9f9f9'
          },
        },
      }}
    >
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
    </ConfigProvider>
  )
}

export default RootApp
