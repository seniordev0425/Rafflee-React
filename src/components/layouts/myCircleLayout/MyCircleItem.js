import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'

function MyCircleItem(props) {
    const { item } = props

    return (
        <Row>
            <Col xs="12" sm={{ size: 10, offset: 1 }}>
                <Row>
                    <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
                        <Link to={`/company/${item.id}/`}>
                            <img src={item.logo_url ? item.logo_url : images.profile_img} className="pointer rounded-circle" alt="" />
                        </Link>
                    </Col>
                    <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                        <div className="d-sm-flex justify-content-sm-between">
                            <div className="d-sm-flex align-items-sm-center">
                                <Link to={`/company/${item.id}/`}>
                                    <div className="font-size-12 font-weight-bold color-blue pointer">
                                        {item.company_name}
                                        {item.certified &&
                                            <img src={images.verified_icon} width={20} height={20} className="ml-3 mt-n1" alt="" />
                                        }
                                    </div>
                                </Link>
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