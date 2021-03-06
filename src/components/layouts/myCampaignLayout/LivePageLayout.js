import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Select, Button, Input } from 'antd'
import images from '../../../utils/images'
import Congratulation from '../../modals/Congratulation'
import Loading from '../../common/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons'
import {
  getCampaignParticipants,
  getCampaignWinnings,
  drawCampaign
} from '../../../actions/campaign'

import { useTranslation } from 'react-i18next'

function LivePageLayout(props) {
  const { t } = useTranslation()

  const { id, goBack } = props

  // These Redux states are defined in reducer. Please check there.
  const participants = useSelector(state => state.campaign.participants)
  const campaignWinnings = useSelector(state => state.campaign.campaignWinnings)
  const winnerArr = useSelector(state => state.campaign.winnerArr)
  const isFetchingParticipants = useSelector(state => state.userInfo.GET_CAMPAIGN_PARTICIPANTS)
  const isFetchingWinnings = useSelector(state => state.userInfo.GET_CAMPAIGN_WINNINGS)
  const isDrawing = useSelector(state => state.userInfo.DRAW_CAMPAIGN)
  const toggleWinnersModal = useSelector(state => state.campaign.TOGGLE_WINNERS_MODAL)

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [drawType, setDrawType] = useState('draw_by_gift')
  const [winningType, setWinningType] = useState('')
  const [keyword, setKeyword] = useState('')

  const { Option } = Select

  useEffect(() => {
    dispatch(getCampaignParticipants(id))
    dispatch(getCampaignWinnings(id))
  }, [])

  useEffect(() => {
    if (toggleWinnersModal) {
      onToggle()
      dispatch({ type: 'DRAW_CAMPAIGN_SUCCESS', data: winnerArr, flag: false })
    }
  }, [toggleWinnersModal])

  useEffect(() => {
    // Initialize winning type as the first one of campaign winnings array
    setWinningType(campaignWinnings.length ? campaignWinnings[0].name : '')
  }, [campaignWinnings])

  const onToggle = () => {
    // Toggle winning modal
    setOpen(!open)
  }

  const renderParticipants = () => {
    return (
      (participants.filter((item, index) => item.email.toLowerCase().includes(keyword) || item.username.toLowerCase().includes(keyword))).map((item, index) =>
        <Row key={index} className="pt-3 pb-3" style={!(index % 2) ? { background: "rgba(191, 232, 254, 0.25)" } : { background: "white" }}>
          <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x font-size-11">
            <div className="float-left">{item.username}</div>
            <div className="float-right view-profile-link">{t('my_campaign_page.view_profile')}</div>
          </Col>
        </Row>
      )
    )
  }

  const renderWinnings = () => {
    return (
      campaignWinnings.map((item, index) =>
        <Option key={index} value={item.name}>{item.name}</Option>
      )
    )
  }

  const handleDrawType = (value) => {
    setDrawType(value)
  }

  const handleWinningType = (value) => {
    setWinningType(value)
  }

  const onSubmit = () => {
    dispatch(drawCampaign(id, drawType, winningType))
  }

  if (isFetchingParticipants || isFetchingWinnings) {
    return <Loading />
  }

  return (
    <>
      <Row className="mt-4 mb-3">
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <div className="float-left blue-link-btn" onClick={() => goBack(null)}>{t('my_campaign_page.back_to_campaign_page')}</div>
          <div className="float-right"><img src={images.video_player} alt="" /></div>
        </Col>
      </Row>
      <Row className="mt-5 mb-3">
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <div className="float-left" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{t('my_campaign_page.participants')} ({participants.length})</div>
          <div className="float-right d-flex align-items-center">
            <Input
              onChange={e => setKeyword(e.target.value.toLowerCase())}
              size="small"
              placeholder="Name or email"
              prefix={<FontAwesomeIcon icon={faSearch} />}
              className="mycampaign-searchbox"
            />
            <FontAwesomeIcon icon={faSlidersH} className="ml-3" />
          </div>
        </Col>
      </Row>
      {renderParticipants()}
      <Row className="mt-5 mb-5">
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <Row>
            <Col xs="12" md="4">
              <span className="footer-link-bold mr-3">{t('my_campaign_page.draw_type')}: </span>
              <Select defaultValue="draw_by_gift" onChange={handleDrawType} size="large" style={{ width: 180 }}>
                <Option value="draw_by_gift">{t('my_campaign_page.draw_by_gift')}</Option>
                <Option value="draw_all_by_gift">{t('my_campaign_page.draw_all_by_gift')}</Option>
                <Option value="draw">{t('my_campaign_page.draw')}</Option>
                <Option value="draw_all">{t('my_campaign_page.draw_all')}</Option>
              </Select>
            </Col>
            <Col xs="12" md="4" className="mt-md-0 mt-4">
              {(drawType === 'draw_by_gift' || drawType === 'draw_all_by_gift') && (
                <>
                  <span className="footer-link-bold mr-3">{t('my_campaign_page.prize_type')} : </span>
                  <Select
                    onChange={handleWinningType}
                    value={winningType}
                    size="large"
                    style={{ width: 180 }}
                  >
                    {renderWinnings()}
                  </Select>
                </>
              )}
            </Col>
            <Col xs="12" md="4" className="mt-md-0 mt-4 d-flex justify-content-start justify-content-md-end">
              <Button
                type="primary"
                className="ant-blue-btn float-right"
                style={{ width: 160 }}
                onClick={onSubmit}
                loading={isDrawing}
              >
                {!isDrawing && t('button_group.draw')}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Congratulation open={open} onToggle={onToggle} winnerArr={winnerArr} />
    </>
  )
}

export default LivePageLayout