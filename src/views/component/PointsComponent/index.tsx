import { Button } from 'antd';
import './style.scss'

export const PointsComponent = props => {
    const { value } = props

    return (
        <div className='card-item'>
            {/* Points card */}
            <div className='card-item-card'>
                Points
            </div>

            {/* Points text */}
            <div className='card-item-text'>
                Points
            </div>

            {/* points info */}
            <div className='card-item-points'>
                <div className='card-item-points-info'>
                    <span>
                        Bank
                    </span>
                    <span>
                        Kuda
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Bank Account Number
                    </span>
                    <span>
                        1234567890
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Name
                    </span>
                    <span>
                        BADDALAJHDHAU
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Points
                    </span>
                    <span>
                        987654321.99
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Amount
                    </span>
                    <span>
                        987654321.99 NGN
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Order Number
                    </span>
                    <span>
                        1234567834567890
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Order Time
                    </span>
                    <span>
                        2023.9.19 23.55
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Time Limit
                    </span>
                    <span>
                        120 min
                    </span>
                </div>
            </div>

            {/* In trade */}
            <div className='card-item-btn'>
                <Button className='antdog-btn' type="primary">Cancel</Button>
                <Button className='antdog-btn' type="primary">
                    Paid
                </Button>
            </div>

            {/* In dispute */}
            {/* <div className='card-item-btn'>
                <Button className='antdog-btn disabled' type="primary" disabled>
                    Platform is in arbitration,please wait
                </Button>
            </div> */}
            {/* <div className='card-item-btn short'>
                <Button className='antdog-btn processing' type="primary" disabled>
                    Order Processing
                </Button>
            </div> */}

            {/* Cancelled */}
            {/* <div className='card-item-btn short'>
                <Button className='antdog-btn disabled' type="primary" disabled>
                    Cancelled
                </Button>
            </div> */}

            {/* Completed */}
            {/* <div className='card-item-btn short'>
                <Button className='antdog-btn disabled' type="primary" disabled>
                    Order Completed
                </Button>
            </div> */}
        </div>
    )
}
