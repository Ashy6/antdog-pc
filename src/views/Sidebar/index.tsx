/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import { Button } from 'antd';
import './style.scss'

type MenuType = 'menu' | 'submenu';
interface Menu {
    key: string;
    label: string;
    type: MenuType;
    parentId?: string;
    children?: Menu[];
}

const MENUS: Menu[] = [
    {
        key: 'cards',
        label: 'Cards',
        type: 'menu',
        children: [
            { key: 'cards-in-trade', parentId: 'cards', label: 'In trade', type: 'submenu' },
            { key: 'cards-in-dispute', parentId: 'cards', label: 'In dispute', type: 'submenu' },
            { key: 'cards-completed', parentId: 'cards', label: 'Completed', type: 'submenu' },
        ]
    },
    {
        key: 'points',
        label: 'Points',
        type: 'menu',
        children: [
            { key: 'points-in-trade', parentId: 'points', label: 'In trade', type: 'submenu' },
            { key: 'points-completed', parentId: 'points', label: 'Completed', type: 'submenu' },
            { key: 'points-in-dispute', parentId: 'points', label: 'In dispute', type: 'submenu' },
            { key: 'points-cancelled', parentId: 'points', label: 'Cancelled', type: 'submenu' },
        ]
    },
    {
        key: 'ruling',
        label: 'Ruling',
        type: 'menu',
        children: [
            { key: 'ruling-cards', parentId: 'ruling', label: 'Cards', type: 'submenu' },
            { key: 'ruling-points', parentId: 'ruling', label: 'Points', type: 'submenu' },
        ]
    }
]
const getClassName = (key: string, type: 'menu' | 'submenu') => {
    const className = `${type} ${key}`
    return className;
}

export const Sidebar = (props: { menusChange: (selectedMenuKeys: string[]) => void }) => {
    const [balancePoints] = useState('987654321.98');

    const [menus] = useState(MENUS);

    const [selectedMenuKeys, setSelectedMenuKey] = useState([MENUS[0].key]);

    const onMenuClick = (item: Menu) => {
        if (item.key === 'ruling') {
            setSelectedMenuKey([item.key, item.children![0].key]);
        }
        setSelectedMenuKey(item.parentId ? [item.key, item.parentId] : [item.key]);
    }

    useEffect(() => {
        props.menusChange(selectedMenuKeys);
    }, [selectedMenuKeys]);

    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
                <div className='header-box'>
                    <div>Team-hhhh</div>
                    <div>KKKKKK</div>
                    <div className='balance'>{balancePoints} Points</div>
                </div>
            </div>
            {
                menus.map(menu => {
                    let menuClassName = getClassName(menu.key, menu.type);
                    if (menu.children && menu.children.length > 0) {
                        return <ul key={menu.key}>
                            <div className={menuClassName += (selectedMenuKeys.includes(menu.key) ? ' active' : '')} onClick={() => onMenuClick(menu)}>{menu.label}</div>
                            {
                                menu.children?.map(submenu => {
                                    let submenuClassName = getClassName(submenu.key, submenu.type);
                                    return <li key={submenu.key} className={submenuClassName += (selectedMenuKeys.includes(submenu.key) ? ' active' : '')} onClick={() => onMenuClick(submenu)}>{submenu.label}</li>
                                })
                            }
                        </ul>
                    } else {
                        return <ul className={menuClassName}>{menu.label}</ul>
                    }
                })
            }
            <div className='logout-box'>
                <Button type="link">Logout</Button>
            </div>
        </div>

    );
}
