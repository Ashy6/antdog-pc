import React from "react"
import { Menu, SidebarMenuType, SidebarSubMenuType } from "../../types/types"

export const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#666',
  height: 100,
  paddingInline: 200,
  lineHeight: '64px',
  backgroundColor: '#FFF'
}

export const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  height: `calc(100% - 100px)`,
  color: '#666',
  backgroundColor: '#fff'
}

export const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#666',
  backgroundColor: '#fff'
}

export const MENUS: Menu[] = [
    {
        key: SidebarMenuType.Cards,
        label: 'Cards',
        type: 'menu',
        children: [
            { key: SidebarSubMenuType.InTrade, parentId: 'cards', label: 'In trade', type: 'submenu' },
            { key: SidebarSubMenuType.InDispute, parentId: 'cards', label: 'In dispute', type: 'submenu' },
            { key: SidebarSubMenuType.Completed, parentId: 'cards', label: 'Completed', type: 'submenu' },
        ]
    },
    {
        key: SidebarMenuType.Points,
        label: 'Points',
        type: 'menu',
        children: [
            { key: SidebarSubMenuType.InTrade, parentId: 'points', label: 'In trade', type: 'submenu' },
            { key: SidebarSubMenuType.InDispute, parentId: 'points', label: 'In dispute', type: 'submenu' },
            { key: SidebarSubMenuType.Completed, parentId: 'points', label: 'Completed', type: 'submenu' },
            { key: SidebarSubMenuType.Cancelled, parentId: 'points', label: 'Cancelled', type: 'submenu' },
        ]
    },
    {
        key: SidebarMenuType.Ruling,
        label: 'Ruling',
        type: 'menu',
        children: [
            { key: SidebarMenuType.Cards, parentId: 'ruling', label: 'Cards', type: 'submenu' },
            { key: SidebarMenuType.Points, parentId: 'ruling', label: 'Points', type: 'submenu' },
        ]
    }
]