import React from 'react'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'

function MyCircleItem(props) {
    const { item, goToDetailPage } = props

    return (
        <Row>
            <Col xs="12" sm={{ size: 10, offset: 1 }}>
                <Row>
                    <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
                        <img src={item.logo_url ? item.logo_url : images.profile_img} className="pointer" onClick={() => goToDetailPage(item.id)} />
                    </Col>
                    <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                        <div className="d-sm-flex justify-content-sm-between">
                            <div className="d-sm-flex align-items-sm-center">
                                <div className="font-size-12 font-weight-bold color-blue pointer" onClick={() => goToDetailPage(item.id)}>
                                    {item.company_name}
                                    {item.certified &&
                                        <img src={images.verified_icon} width={20} height={20} className="ml-3 mt-n1" />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="font-size-12 mt-4">{item.description}</div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default MyCircleItem