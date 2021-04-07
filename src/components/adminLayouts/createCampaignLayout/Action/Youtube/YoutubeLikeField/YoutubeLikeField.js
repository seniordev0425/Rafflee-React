import React from 'react'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox } from 'antd'
import YoutubeVideoSelect from './YoutubeVideoSelect'

import moment from 'moment'

import images from '../../../../../../utils/images'
import { useTranslation } from 'react-i18next'

function YoutubeLikeField(props) {
  const { t } = useTranslation()

  const {
    action,
    setAction,
    params,
    setParams
  } = props

  return (
    <div className="mt-3 mt-sm-5">
      <div
        className="d-flex justify-content-between align-items-center px-2 px-sm-4"
        style={{ height: 50, backgroundColor: '#ff0200', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      >
        <div>
          <img src={images.youtube_action_icon} width={30} alt="" />
          <span className="ml-3">{t('create_campaign_page.like')}</span>
        </div>
        <div>
          <Tooltip title={t('tooltips.youtube_like')}>
            <img src={images.question_mark_white_icon} width={22} alt="" />
          </Tooltip>
          <span
            className="ml-3 pointer"
            onClick={() => setParams('youtube', params.youtube.filter(item => item.id !== action.id))}
          >
            {t('button_group.remove')}
          </span>
        </div>
      </div>
      <div
        className="p-2 p-sm-4"
        style={{
          borderColor: '#E6ECEE',
          borderWidth: 1,
          borderStyle: 'solid',
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6
        }}
      >
        <Row>
          <Col xs="12" sm="6" className="p-0">
            <YoutubeVideoSelect action={action} setAction={setAction} />
          </Col>
          <Col size="12" className="p-0 justify-content-between align-items-center mt-3 mt-sm-0">
            <Row>
              <Col xs="12" sm="8" className="p-0">
                <Row>
                  <Col className="p-0 px-sm-4">
                    <Input
                      value={action.like_entries}
                      onChange={(e) => setAction('youtube', action.id, { ...action, like_entries: e.target.value })}
                      className="custom-form-control"
                      type="number"
                      placeholder={t('create_campaign_page.entries')}
                      min={0}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs="12" sm="4" className="p-0 d-flex align-items-center justify-content-end mt-3 mt-sm-0">
                <Checkbox
                  checked={action.like_mandatory}
                  onChange={(e) => setAction('youtube', action.id, { ...action, like_mandatory: e.target.checked })}
                />
                <span className="ml-3 footer-link">{t('create_campaign_page.mandatory')}</span>
              </Col>
            </Row>
          </Col>
        </Row>
        {action.like_url_img &&
          <div className="mt-4 d-flex">
            <img
              src={action.like_url_img}
              width={50}
              height={50}
              className="rounded-circle"
              alt="avatar"
            />
            <div className="ml-4 color-gray font-size-12">
              <div>
                <span className="font-weight-bold">{t('create_campaign_page.video_title')}</span>
                <span className="ml-3">
                  {action.like_video_title}
                </span>
              </div>
              <div className="mt-4">
                <span className="font-weight-bold">{t('create_campaign_page.channel_title')}</span>
                <span className="ml-3">
                  {action.like_channel_title}
                </span>
              </div>
              <div className="mt-4">
                <span className="font-weight-bold">{t('create_campaign_page.published_at')}</span>
                <span className="ml-3">
                  {moment(action.like_published_at).format('YYYY-MM-DD')}
                </span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default YoutubeLikeField