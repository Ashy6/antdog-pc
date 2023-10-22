import { Col, Row } from 'antd';
import { CardsComponent } from './CardComponent';
import './style.scss'

export const Container = ({ select }: { select: string[] }) => {

    console.log(select);

    return (
        <div className="main h-100">
            <div className='main-cards'>
                <Row className='cards' gutter={[32, 16]}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((card, i) => <Col className="gutter-row" key={i} span={6}>
                            <CardsComponent value={card} ></CardsComponent>
                        </Col>)
                    }
                </Row>
            </div>
            <div className='main-pagination'>pagination</div>
        </div>
    )
}