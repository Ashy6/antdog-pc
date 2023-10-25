import { ReactElement } from 'react'
import './style.scss'

const FullComponent = ({ children }: { children: ReactElement }) => {
    return <div className='full-container'>{children}</div>
}

export default FullComponent
