/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import './style.scss'

export const Sidebar = (props: { callback: (par: object) => void }) => {
    const [value, _setValue] = useState({
        a: 86790,
        b: 'ddd'
    })

    // 回调传值，子传父
    const onSideClick = () => {
        props.callback(value)
    }

    return (
        <div className="sidebar" onClick={onSideClick}>
            Sidebar
        </div>
    )
}