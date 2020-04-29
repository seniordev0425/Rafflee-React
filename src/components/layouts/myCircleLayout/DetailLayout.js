import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { getCompanyWall } from '../../../actions/userInfo'
import images from '../../../utils/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../common/Loading'
import moment from 'moment'

import { useTranslation } from 'react-i18next'

function DetailLayout(props) {
    const { t } = useTranslation()

    const { goBack, id } = props

    const GET_COMPANY_WALL_PROCESS = useSelector(state => state.userInfo.GET_COMPANY_WALL)
    const companyWall = useSelector(state => state.userInfo.companyWall)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCompanyWall(id))
    }, [])

    const renderTwitterWall = () => {
        return (
            <Row className="social-wall-container">
                <Col xs="12" sm={{ size: 10, offset: 1 }}>
                    <Row>
                        <Col lg="1" md="2" sm="2" xs="3" className="company-wall-img">
                            <img src={((companyWall || {}).twitter || {}).profile_image_url} />
                        </Col>
                        <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                            <div className="d-sm-flex">
                                <div>
                                    <img src={images.twitter_icon} width={20} height={20} />
                                    <span className="font-size-10 font-weight-bold color-blue ml-3">{((companyWall || {}).twitter || {}).name}</span>
                                </div>
                                <div className="font-size-10 ml-sm-3 mt-2 mt-sm-0">
                                    <span><span className="font-weight-bold">{((companyWall || {}).twitter || {}).followers}</span> {t('my_circle_page.followers')}</span>
                                    <span className="ml-3"><span className="font-weight-bold">{((companyWall || {}).twitter || {}).friends}</span> {t('my_circle_page.friends')}</span>
                                </div>
                            </div>
                            <div className="mt-4 font-size-9">
                                {((companyWall || {}).twitter || {}).tweets.map((item, index) => 
                                    <div key={index} className="mb-3">
                                        <div>{item.text}</div>
                                        <div className="color-gray">{moment(item.created_at).format("ddd, MMM Do YYYY")}</div>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

    if (GET_COMPANY_WALL_PROCESS) return <Loading />

    return (
        <div>
            <Row className="mt-4 mb-4">
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="px-4">
                    <div className="float-left blue-link-btn" onClick={goBack}>{t('my_circle_page.back')}</div>
                    <div className="float-right"><FontAwesomeIcon icon={faSlidersH} className="ml-3" /></div>
                </Col>
            </Row>
            {(companyWall || {}).twitter &&
                renderTwitterWall()
            }
        </div>
    )
}

export default DetailLayout