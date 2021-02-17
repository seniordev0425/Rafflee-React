import React from 'react'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox } from 'antd'
import images from '../../../../../utils/images'

import { useTranslation } from 'react-i18next'


function FacebookLikeShareUrl(props) {
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
        style={{ height: 50, backgroundColor: '#4264A3', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      >
        <div className="d-flex align-items-center">
          <img src={images.facebook_action_icon} width={10} height={16} alt="" />
          <span className="ml-3">{t('create_campaign_page.like_share_url')}</span>
        </div>
        <div>
          <Tooltip title={t('tooltips.facebook_url')}>
            <img src={images.question_mark_white_icon} width={22} alt="" />
          </Tooltip>
          <span
            className="ml-3 pointer"
            onClick={() => setParams('facebook', params.facebook.filter(item => item.id !== action.id))}
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
              placeholder={t('create_campaign_page.like_share_url')}
              value={action.url_url}
              onChange={(e) => setAction('facebook', action.id, { ...action, url_url: e.target.value })}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <div>
            <Checkbox
              checked={action.url_like}
              onChange={(e) => setAction('facebook', action.id, { ...action, url_like: e.target.checked })}
            >
              {t('create_campaign_page.like')}
            </Checkbox>
            <Checkbox
              checked={action.url_share}
              onChange={(e) => setAction('facebook', action.id, { ...action, url_share: e.target.checked })}
            >
              {t('create_campaign_page.share')}
            </Checkbox>
            <Checkbox
              checked={action.url_comment}
              onChange={(e) => setAction('facebook', action.id, { ...action, url_comment: e.target.checked })}
            >
              {t('create_campaign_page.comment')}
            </Checkbox>
          </div>
        </Row>
        <Row className="mt-5">
          <Col xs="12" sm="6" className="p-0">
            <Input
              value={action.url_entries}
              onChange={(e) => setAction('facebook', action.id, { ...action, url_entries: e.target.value })}
              className="custom-form-control w-100"
              type="number"
              placeholder={t('create_campaign_page.entries')}
              min={0}
            />
          </Col>
          <Col xs="12" sm="6" className="p-0 d-flex align-items-center justify-content-end mt-3 mt-sm-0">
            <Checkbox checked={action.url_mandatory} onChange={(e) => setAction('facebook', action.id, { ...action, url_mandatory: e.target.checked })} />
            <span className="ml-3 footer-link">{t('create_campaign_page.mandatory')}</span>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default FacebookLikeShareUrl