/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'

import { LOGIN_URL } from '../../route/root'
import { MENUS } from '../Manage/data'
import {
    ActiveSidebar,
    SidebarMenuType,
    SidebarSubMenuType
} from '../Manage/types'

import './style.scss'
import { useSelector } from 'react-redux'

const { confirm } = Modal;

export const Sidebar = (props: {
    menusChange: (activeSidebar: ActiveSidebar) => void
}) => {
    const navigate = useNavigate()
    const userInfo = useSelector((store: { userInfo: AnyObject }) => store.userInfo.value)

    const [activeMenu, setActiveMenu] = useState(MENUS[0].key)
    const [activeSubMenu, setActiveSubMenu] = useState<
        SidebarMenuType | SidebarSubMenuType
    >(SidebarSubMenuType.none)

    useEffect(() => {
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
    }, [activeMenu, activeSubMenu])

    const onLogouClick = () => {
        confirm({
            className: 'antdog-enter-model',
            maskClosable: true,
            centered: true,
            mask: false,
            title: 'Are you logging out?',
            icon: <></>,
            okText: <><CheckOutlined /></>,
            cancelText: <><CloseOutlined /></>,
            onOk() {
                localStorage.setItem('AntdogToken', '')
                navigate(LOGIN_URL)
            },
            onCancel() { },
        });
    }

    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
                <div className='header-box'>
                    <div>{userInfo.merchName}</div>
                    <div>{userInfo.merchNo}</div>
                    <div className='balance'>{userInfo.points} Points</div>
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
                                if (menu.key === SidebarMenuType.Ruling) {
                                    // Ruling 只有选中逻辑
                                    setActiveSubMenu(submenu.key)
                                } else {
                                    // 子菜单有 取消选中逻辑
                                    setActiveSubMenu(submenu.key === activeSubMenu ? SidebarSubMenuType.none : submenu.key)
                                }
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
