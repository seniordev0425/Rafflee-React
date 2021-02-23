import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox, Select } from 'antd'
import ReactPlayer from 'react-player'
import * as _ from 'lodash'
import moment from 'moment'
import images from '../../../../../utils/images'

import { useTranslation } from 'react-i18next'

const { Option } = Select

function InstagramCommentField(props) {
  const { t } = useTranslation()

  const {
    action,
    setAction,
    params,
    setParams
  } = props

  const instagramPublications = useSelector(state => state.social.instagramPublications)
  const GET_INSTAGRAM_PUBLICATIONS_PROCESS = useSelector(state => state.userInfo.GET_INSTAGRAM_PUBLICATIONS)

  const updatePublication = (id) => {
    let publication = _.find(instagramPublications, { id: id })
    setAction('instagram', action.id, {
      ...action,
      comment_id: publication.id,
      comment_url: publication.media_url,
      comment_caption: publication.caption,
      comment_like_count: publication.like_count,
      comment_created_at: publication.timestamp,
      comment_media_type: publication.media_type,
      comment_permalink: publication.permalink
    })
  }

  return (
    <div className="mt-3 mt-sm-5">
      <div
        className="d-flex justify-content-between align-items-center px-2 px-sm-4"
        style={{ height: 50, backgroundColor: '#1E3F6C', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      >
        <div className="d-flex align-items-center">
          <img src={images.instagram_action_icon} width={18} height={18} alt="" />
          <span className="ml-3">{t('create_campaign_page.instagram_comment')}</span>
        </div>
        <div>
          <Tooltip title={t('tooltips.instagram_comment')}>
            <img src={images.question_mark_white_icon} width={22} alt="" />
          </Tooltip>
          <span
            className="ml-3 pointer"
            onClick={() => setParams('instagram', params.instagram.filter(item => item.id !== action.id))}
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
          <Col xs="12" sm="6" className="p-0 d-flex align-items-center">
            <Select
              value={action.comment_id}
              className="w-100"
              placeholder={t('create_campaign_page.select_page')}
              onChange={updatePublication}
              size="large"
              loading={GET_INSTAGRAM_PUBLICATIONS_PROCESS}
            >
              {instagramPublications.map((publication) => (
                <Option key={publication.id} value={publication.id}>
                  {publication.caption}
                </Option>
              ))}
            </Select>
          </Col>
          <Col size="12" className="p-0 justify-content-end align-items-center mt-3 mt-sm-0">
            <Row>
              <Col xs="12" sm="6" className="p-0">
                <Input
                  value={action.comment_entries}
                  onChange={(e) => setAction('instagram', action.id, { ...action, comment_entries: e.target.value })}
                  className="custom-form-control ml-0 ml-sm-4 w-100"
                  type="number"
                  placeholder={t('create_campaign_page.entries')}
                  min={0}
                />
              </Col>
              <Col xs="12" sm="6" className="p-0 d-flex align-items-center justify-content-end mt-3 mt-sm-0">
                <Checkbox checked={action.comment_mandatory} onChange={(e) => setAction('instagram', action.id, { ...action, comment_mandatory: e.target.checked })} />
                <span className="ml-3 footer-link">{t('create_campaign_page.mandatory')}</span>
              </Col>
            </Row>
          </Col>
        </Row>
        {action.comment_id &&
          <div className="mt-4 color-gray font-size-12">
            <div>
              <span className="font-weight-bold">{t('create_campaign_page.name')}</span>
              <span className="ml-3">
                {action.comment_caption}
              </span>
              <span className="font-weight-bold ml-4">{t('create_campaign_page.like')}:</span>
              <span className="ml-2">{action.comment_like_count}</span>
            </div>
            <div className="mt-4">
              <span className="font-weight-bold">{t('create_campaign_page.created_at')}</span>
              <span className="ml-3">
                {moment(action.comment_created_at).format('YYYY-MM-DD')}
              </span>
            </div>
            <div className="d-flex justify-content-center">
              {action.comment_media_type === 'IMAGE' &&
                <img src={action.comment_url} className="instagram-wall-img" alt="" />
              }
              {action.comment_media_type === 'VIDEO' &&
                <ReactPlayer
                  loop
                  playing
                  url={action.comment_url}
                  style={{ borderRadius: 10, maxHeight: 400 }}
                />
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default InstagramCommentField