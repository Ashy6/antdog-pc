import { Col, Row } from 'antd';
import { CardsComponent } from './CardsComponent';
import { PointsComponent } from './PointsComponent';
import './style.scss'
import { useEffect, useState } from 'react';

const component: { [key: string]: (props) => JSX.Element } = {
    cards: (props) => <CardsComponent value={props}></CardsComponent>,
    points: (props) => <PointsComponent value={props}></PointsComponent>
}

export const Container = ({ select }: { select: string[] }) => {

    const [showType, setShowType] = useState('');

    useEffect(() => {
        console.log(select);
        setShowType(select[0])
    }, [select]);

    return (
        <div className="main h-100">
            <div className='main-cards'>
                <Row className='cards' gutter={[32, 16]}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((card, i) => {
                            return <Col className="gutter-row" key={i} span={6}>
                                {component[showType]?.(card)}
                            </Col>
                        })
                    }
                </Row>
            </div>
            <div className='main-pagination'>pagination</div>
        </div>
    )
}