import React from 'react'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox } from 'antd'
import YoutubeVideoSelect from './YoutubeVideoSelect'

import moment from 'moment'

import images from '../../../../../../utils/images'
import { useTranslation } from 'react-i18next'

function YoutubeCommentField(props) {
  const { t } = useTranslation()

  const { params, setAction } = props

  return (
    <div className="mt-3 mt-sm-5">
      <div
        className="d-flex justify-content-between align-items-center px-2 px-sm-4"
        style={{ height: 50, backgroundColor: '#F01212', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      >
        <div>
          <img src={images.youtube_action_icon} width={18} height={16} alt="" />
          <span className="ml-3">{t('create_campaign_page.comment')}</span>
        </div>
        <div>
          <Tooltip title={t('tooltips.youtube_comment')}>
            <img src={images.question_mark_white_icon} width={22} alt="" />
          </Tooltip>
          <span
            className="ml-3 pointer"
            onClick={() => setAction('youtube', 'comment', false)}
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
            <YoutubeVideoSelect setAction={setAction} />
          </Col>
          <Col size="12" className="p-0 justify-content-between align-items-center mt-3 mt-sm-0">
            <Row>
              <Col xs="12" sm="8" className="p-0">
                <Row>
                  <Col className="p-0 px-sm-4">
                    <Input
                      value={params.youtube.comment_entries}
                      onChange={(e) => setAction('youtube', 'comment_entries', e.target.value)}
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
                  checked={params.youtube.comment_mandatory}
                  onChange={(e) => setAction('youtube', 'comment_mandatory', e.target.checked)}
                />
                <span className="ml-3 footer-link">{t('create_campaign_page.mandatory')}</span>
              </Col>
            </Row>
          </Col>
        </Row>
        {params.youtube.comment_url_img &&
          <div className="mt-4 d-flex">
            <img
              src={params.youtube.comment_url_img}
              width={50}
              height={50}
              className="rounded-circle"
              alt="avatar"
            />
            <div className="ml-4 color-gray font-size-12 w-100">
              <div>
                <span className="font-weight-bold">{t('create_campaign_page.video_title')}</span>
                <span className="ml-3">
                  {params.youtube.comment_video_title}
                </span>
              </div>
              <div className="mt-4">
                <span className="font-weight-bold">{t('create_campaign_page.channel_title')}</span>
                <span className="ml-3">
                  {params.youtube.comment_channel_title}
                </span>
              </div>
              <div className="mt-4">
                <span className="font-weight-bold">{t('create_campaign_page.published_at')}</span>
                <span className="ml-3">
                  {moment(params.youtube.comment_published_at).format('YYYY-MM-DD')}
                </span>
              </div>
              <div className="mt-4">
                <Input
                  type="text"
                  className="custom-form-control"
                  placeholder={t('create_campaign_page.comment_model')}
                  value={params.youtube.comment_model}
                  onChange={(e) => setAction('youtube', 'comment_model', e.target.value)}
                />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default YoutubeCommentField