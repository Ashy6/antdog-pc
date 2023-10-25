import { ReactPortal } from 'react'
import './style.scss'

const FullComponent = ({ children }: { children: ReactPortal }) => {
    return <div className='full-container'>{children}</div>
}

export default FullComponent
