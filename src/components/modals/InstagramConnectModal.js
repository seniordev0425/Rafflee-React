import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Spinner
} from 'reactstrap'
import { Select, Button } from 'antd'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import images from '../../utils/images'
import { FACEBOOK_APP_ID } from '../../utils/constants'
import {
  instagramBusinessConnect1,
  instagramBusinessConnect2
} from '../../actions/social'
import { useTranslation } from 'react-i18next'
import { openNotification } from '../../utils/notification'

const { Option } = Select

function InstagramConnectModal(props) {
  const { t } = useTranslation()
  const { open, onToggle } = props

  const company = useSelector(state => state.userInfo.company)
  const GET_INSTAGRAM_BUSINESS_PAGES_PROCESS = useSelector(state => state.userInfo.GET_INSTAGRAM_BUSINESS_PAGES)
  const VALIDATE_INSTAGRAM_BUSINESS_CONNECT_PROCESS = useSelector(state => state.userInfo.VALIDATE_INSTAGRAM_BUSINESS_CONNECT)
  const instagramBusinessPages = useSelector(state => state.social.instagramBusinessPages)
  const dispatch = useDispatch()

  const [selectedPageId, setSelectedPageId] = useState('')

  const CustomButton = () => (
    <Row className="pointer my-5">
      <Col xs="2" className="pl-0 pr-0 instagram-icon-container1">
        <img src={images.instagram_icon} alt="" />
      </Col>
      <Col xs="10" className="pl-0 pr-0 instagram-icon-container2">
        {GET_INSTAGRAM_BUSINESS_PAGES_PROCESS
          ?
          <Spinner />
          :
          t('instagram_connect_modal.instagram_business_connect')
        }
      </Col>
    </Row>
  )

  const getInstagramBusinessPages = (response) => {
    var body = {
      token: response.accessToken
    }
    dispatch(instagramBusinessConnect1(body, company))
  }

  const validateInstagramBusinessConnect = () => {
    if (selectedPageId === '') {
      openNotification('warning', t('instagram_connect_modal.select_page'))
      return
    }

    var body = {
      id: selectedPageId
    }
    dispatch(instagramBusinessConnect2(body, company))
  }

  return (
    <Modal isOpen={open} toggle={onToggle} >
      <ModalHeader toggle={onToggle}>
        <div className="text-center font-size-15 color-blue">
          {t('instagram_connect_modal.instagram_connect')}
        </div>
      </ModalHeader>
      <ModalBody className="d-flex justify-content-center">
        <div style={{ width: 320 }}>
          <FacebookLogin
            appId={FACEBOOK_APP_ID}
            fields="instagram_basic,pages_show_list,business_management,pages_read_engagement"
            callback={getInstagramBusinessPages}
            render={renderProps => (
              <div onClick={renderProps.onClick}><CustomButton /></div>
            )}
          />
          {instagramBusinessPages.length > 0 &&
            <div>
              <Select
                className="w-100 mb-5"
                placeholder={t('create_campaign_page.select_page')}
                onChange={(id) => setSelectedPageId(id)}
                size="large"
              >
                {instagramBusinessPages.map((page, id) => (
                  <Option key={id} value={page.id}>
                    {page.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-5 d-flex justify-content-center">
                <Button
                  onClick={validateInstagramBusinessConnect}
                  type="primary"
                  className="ant-blue-btn"
                  loading={VALIDATE_INSTAGRAM_BUSINESS_CONNECT_PROCESS}
                >
                  {!VALIDATE_INSTAGRAM_BUSINESS_CONNECT_PROCESS && t('button_group.confirm')}
                </Button>
              </div>
            </div>
          }
        </div>
      </ModalBody>
    </Modal>
  )
}

export default InstagramConnectModal