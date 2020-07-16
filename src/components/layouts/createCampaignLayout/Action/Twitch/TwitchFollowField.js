import React from 'react'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox } from 'antd'
import images from '../../../../../utils/images'

import { useTranslation } from 'react-i18next'

function TwitchFollowField(props) {
  const { t } = useTranslation()

  const { params, setAction } = props

  return (
    <div className="mt-3 mt-sm-5">
      <div
        className="d-flex justify-content-between align-items-center px-2 px-sm-4"
        style={{ height: 50, backgroundColor: '#9147FF', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      >
        <div className="d-flex align-items-center">
          <img src={images.twitch_action_icon} width={16} height={16} alt="" />
          <span className="ml-3">{t('create_campaign_page.follow_tweet')}</span>
        </div>
        <div>
          <Tooltip title="Tooltip will show on mouse enter.">
            <img src={images.question_mark_white_icon} width={22} alt="" />
          </Tooltip>
          <span
            className="ml-3 pointer"
            onClick={() => setAction('twitch', 'follow', false)}
          >
            {t('button_group.remove')}
          </span>
        </div>
      </div>
      <div
        className="p-2 p-sm-4"
        style={{ borderColor: '#E6ECEE', borderWidth: 1, borderStyle: 'solid', borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}
      >
        <Row>
          <Col xs="12" sm="6" className="p-0">
            <Input
              type="text"
              className="custom-form-control"
              placeholder={t('create_campaign_page.twitch_follow_name')}
              value={params.twitch.follow_name}
              onChange={(e) => setAction('twitch', 'follow_name', e.target.value)}
            />
          </Col>
          <Col size="12" className="p-0 justify-content-end align-items-center mt-3 mt-sm-0">
            <Row>
              <Col xs="12" sm="6" className="p-0">
                <Input
                  value={params.twitch.follow_entries}
                  onChange={(e) => setAction('twitch', 'follow_entries', e.target.value)}
                  className="custom-form-control ml-0 ml-sm-4 w-100"
                  type="number"
                  placeholder={t('create_campaign_page.entries')}
                />
              </Col>
              <Col xs="12" sm="6" className="p-0 d-flex align-items-center justify-content-end mt-3 mt-sm-0">
                <Checkbox checked={params.twitch.follow_mandatory} onChange={(e) => setAction('twitch', 'follow_mandatory', e.target.checked)} />
                <span className="ml-3 footer-link">{t('create_campaign_page.mandatory')}</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default TwitchFollowField