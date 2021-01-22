import React from 'react'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox } from 'antd'
import TwitterCommentSelector from './TwitterCommentSelector'
import images from '../../../../../utils/images'

import moment from 'moment'
import { useTranslation } from 'react-i18next'

function TwitterCommentField(props) {
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
        style={{ height: 50, backgroundColor: '#1EA1F1', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      >
        <div>
          <img src={images.twitter_action_icon} width={18} height={16} alt="" />
          <span className="ml-3">{t('create_campaign_page.comment_tweet')}</span>
        </div>
        <div>
          <Tooltip title={t('tooltips.twitter_like')}>
            <img src={images.question_mark_white_icon} width={22} alt="" />
          </Tooltip>
          <span
            className="ml-3 pointer"
            onClick={() => setParams('twitter', params.twitter.filter(item => item.id !== action.id))}
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
            <TwitterCommentSelector action={action} setAction={setAction} />
          </Col>
          <Col size="12" className="p-0 justify-content-end align-items-center mt-3 mt-sm-0">
            <Row>
              <Col xs="12" sm="6" className="p-0">
                <Input
                  value={action.comment_entries}
                  onChange={(e) => setAction('twitter', action.id, { ...action, comment_entries: e.target.value })}
                  className="custom-form-control ml-0 ml-sm-4 w-100"
                  type="number"
                  placeholder={t('create_campaign_page.entries')}
                  min={0}
                />
              </Col>
              <Col xs="12" sm="6" className="p-0 d-flex align-items-center justify-content-end mt-3 mt-sm-0">
                <Checkbox checked={action.comment_mandatory} onChange={(e) => setAction('twitter', action.id, { ...action, comment_mandatory: e.target.checked })} />
                <span className="ml-3 footer-link">{t('create_campaign_page.mandatory')}</span>
              </Col>
            </Row>
          </Col>
        </Row>
        {action.comment_profile_img &&
          <div className="mt-4 d-flex">
            <img
              src={action.comment_profile_img}
              width={50}
              height={50}
              className="rounded-circle"
              alt="avatar"
            />
            <div className="ml-4 color-gray font-size-12">
              <div>
                <span className="font-weight-bold">{t('create_campaign_page.name')}</span>
                <span className="ml-3">
                  {action.comment_name}
                </span>
                {action.comment_verified &&
                  <img src={images.verified_icon} width={15} height={15} className="ml-2" alt="" />
                }
              </div>
              <div className="mt-4">
                <span className="font-weight-bold">{t('create_campaign_page.like')}: </span>
                <span className="ml-2">
                  {action.comment_like}
                </span>
                <span className="font-weight-bold ml-3">{t('create_campaign_page.retweet')}: </span>
                <span className="ml-2">
                  {action.comment_retweet}
                </span>
              </div>
              <div className="mt-4">
                <span className="font-weight-bold">{t('create_campaign_page.tweet')}</span>
                <span className="ml-3">
                  {action.comment_text}
                </span>
              </div>
              <div className="mt-4">
                <span className="font-weight-bold">{t('create_campaign_page.created_at')}</span>
                <span className="ml-3">
                  {moment(action.comment_created_at).format('YYYY-MM-DD')}
                </span>
              </div>
              <div className="mt-4">
                <Input
                  type="text"
                  className="custom-form-control"
                  placeholder={t('create_campaign_page.comment_model')}
                  value={action.comment_model}
                  onChange={(e) => setAction('twitter', action.id, { ...action, comment_model: e.target.value })}
                />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default TwitterCommentField