/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from 'antd'

import { LOGIN_URL } from '../../route/root'
import { MENUS } from '../Manage/data'
import {
    ActiveSidebar,
    SidebarMenuType,
    SidebarSubMenuType
} from '../Manage/types'

import './style.scss'

export const Sidebar = (props: {
    menusChange: (activeSidebar: ActiveSidebar) => void
}) => {
    const navigate = useNavigate()
    const [balancePoints] = useState('987654321.98')

    const [activeMenu, setActiveMenu] = useState(MENUS[0].key)
    const [activeSubMenu, setActiveSubMenu] = useState<
        SidebarMenuType | SidebarSubMenuType
    >(SidebarSubMenuType.none)

    useEffect(() => {
        console.log('activeMenu, activeSubMenu', activeMenu, activeSubMenu)
        const menuKey =
            activeMenu === SidebarMenuType.Ruling
                ? (activeSubMenu as SidebarMenuType)
                : activeMenu
        const subMenuKey = activeSubMenu
        props.menusChange({
            menuKey,
            subMenuKey,
            isRuling: activeMenu === SidebarMenuType.Ruling
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeMenu, activeSubMenu])

    const onLogouClick = () => {
        // TODO: 1.二次弹框确认   2.清除全局状态管理中的登录状态管理
        localStorage.setItem('AntdogToken', '')
        navigate(LOGIN_URL)
    }

    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
                <div className='header-box'>
                    <div>Team-hhhh</div>
                    <div>KKKKKK</div>
                    <div className='balance'>{balancePoints} Points</div>
                </div>
            </div>
            {MENUS.map(menu => (
                <ul key={menu.key}>
                    <div
                        className={`${menu.type} ${menu.key} ${activeMenu === menu.key && ' active'
                            }`}
                        onClick={() => {
                            setActiveMenu(menu.key)
                            if (menu.key === SidebarMenuType.Ruling) {
                                // Ruling 默认选第一个子
                                setActiveSubMenu(menu.children[0].key)
                            } else {
                                // 选父默认为空
                                setActiveSubMenu(SidebarSubMenuType.none)
                            }
                        }}
                    >
                        {menu.label}
                    </div>
                    {menu.children.map(submenu => (
                        <li
                            key={submenu.key}
                            className={`${submenu.type} ${submenu.key} ${activeMenu === menu.key &&
                                activeSubMenu === submenu.key &&
                                ' active'
                                }`}
                            onClick={() => {
                                setActiveMenu(menu.key)
                                setActiveSubMenu(submenu.key)
                            }}
                        >
                            {submenu.label}
                        </li>
                    ))}
                </ul>
            ))}
            <div className='logout-box'>
                <Button type='link' className='antdog-btn' onClick={onLogouClick}>
                    Logout
                </Button>
            </div>
        </div>
    )
}
