import React from 'react'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox } from 'antd'
import TwitterRetweetSelector from './TwitterRetweetSelector'

import moment from 'moment'
import images from '../../../../../utils/images'
import { useTranslation } from 'react-i18next'

function TwitterRetweetField(props) {
  const { t } = useTranslation()

  const { params, setAction } = props

  return (
    <div className="mt-3 mt-sm-5">
      <div
        className="d-flex justify-content-between align-items-center px-2 px-sm-4"
        style={{ height: 50, backgroundColor: '#1EA1F1', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      >
        <div>
          <img src={images.twitter_action_icon} width={18} height={16} alt="" />
          <span className="ml-3">{t('create_campaign_page.retweet_tweet')}</span>
        </div>
        <div>
          <Tooltip title={t('tooltips.twitter_retweet')}>
            <img src={images.question_mark_white_icon} width={22} alt="" />
          </Tooltip>
          <span
            className="ml-3 pointer"
            onClick={() => setAction('twitter', 'retweet', false)}
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
            <TwitterRetweetSelector setAction={setAction} />
          </Col>
          <Col size="12" className="p-0 justify-content-end align-items-center mt-3 mt-sm-0">
            <Row>
              <Col xs="12" sm="6" className="p-0">
                <Input
                  value={params.twitter.retweet_entries}
                  onChange={(e) => setAction('twitter', 'retweet_entries', e.target.value)}
                  className="custom-form-control ml-0 ml-sm-4 w-100"
                  type="number"
                  placeholder={t('create_campaign_page.entries')}
                  min={0}
                />
              </Col>
              <Col xs="12" sm="6" className="p-0 d-flex align-items-center justify-content-end mt-3 mt-sm-0">
                <Checkbox checked={params.twitter.retweet_mandatory} onChange={(e) => setAction('twitter', 'retweet_mandatory', e.target.checked)} />
                <span className="ml-3 footer-link">{t('create_campaign_page.mandatory')}</span>
              </Col>
            </Row>
          </Col>
        </Row>
        {params.twitter.retweet_id &&
          <div className="mt-4 d-flex">
            <img
              src={params.twitter.retweet_profile_img}
              width={50}
              height={50}
              className="rounded-circle"
              alt="avatar"
            />
            <div className="ml-4 color-gray font-size-12">
              <div>
                <span className="font-weight-bold">{t('create_campaign_page.name')}</span>
                <span className="ml-3">
                  {params.twitter.retweet_name}
                </span>
                {params.twitter.retweet_verified &&
                  <img src={images.verified_icon} width={15} height={15} className="ml-2" alt="" />
                }
              </div>
              <div className="mt-4">
                <span className="font-weight-bold">{t('create_campaign_page.like')}: </span>
                <span className="ml-2">
                  {params.twitter.retweet_like}
                </span>
                <span className="font-weight-bold ml-3">{t('create_campaign_page.retweet')}: </span>
                <span className="ml-2">
                  {params.twitter.retweet_retweet}
                </span>
              </div>
              <div className="mt-4">
                <span className="font-weight-bold">{t('create_campaign_page.tweet')}</span>
                <span className="ml-3">
                  {params.twitter.retweet_text}
                </span>
              </div>
              <div className="mt-4">
                <span className="font-weight-bold">{t('create_campaign_page.created_at')}</span>
                <span className="ml-3">
                  {moment(params.twitter.retweet_created_at).format('YYYY-MM-DD')}
                </span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default TwitterRetweetField