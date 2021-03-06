import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Input } from 'reactstrap'
import { Button, Radio, Checkbox, Tooltip } from 'antd'
import images from '../../../../utils/images'

import { useTranslation } from 'react-i18next'

function CampaignType(props) {
  const { t } = useTranslation()
  
  const { params, setParams, setSection, onBack } = props

  return (
    <Row>
      <Col sm={{ size: "10", offset: "1" }} xs="12" className="padding-x">
        <div className="mt-5 mb-3 ml-3">
          <div className="footer-link-bold">{t('create_campaign_page.campaign_sort')}</div>
          <div className="m-3">
            <Radio.Group value={params.campaign_type} onChange={(e) => setParams('campaign_type', e.target.value)} style={{ display: 'block' }}>
              <div className="d-flex align-items-center justify-content-between">
                <Radio value="giveaway" />
                <div className={params.campaign_type === 'giveaway' ? "inline-sort-div-active" : "inline-sort-div-inactive"}>
                  {t('create_campaign_page.giveaway')}
                  <Tooltip title={t('tooltips.giveaway')}>
                    <img src={params.campaign_type === 'giveaway' ? images.question_icon : images.question_mark_gray_icon} width={26} height={26} alt="" />
                  </Tooltip>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-4">
                <Radio value="reward" />
                <div className={params.campaign_type === 'reward' ? "inline-sort-div-active" : "inline-sort-div-inactive"}>
                  {t('create_campaign_page.reward')}
                  <Tooltip title={t('tooltips.reward')}>
                    <img src={params.campaign_type === 'reward' ? images.question_icon : images.question_mark_gray_icon} width={26} height={26} alt="" />
                  </Tooltip>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-4">
                <Radio value="rafflee" disabled />
                <div className={params.campaign_type === 'rafflee' ? "inline-sort-div-active" : "inline-sort-div-inactive"}>
                  {t('create_campaign_page.rafflee')}
                  <Tooltip title={t('tooltips.giveaway')}>
                    <img src={params.campaign_type === 'rafflee' ? images.question_icon : images.question_mark_gray_icon} width={26} height={26} alt="" />
                  </Tooltip>
                </div>
              </div>
            </Radio.Group>
          </div>
          <div className="footer-link-bold">{t('create_campaign_page.options')}</div>
          <div className="m-3">
            <div className="d-flex align-items-center justify-content-between mt-4">
              <Checkbox
                checked={params.live_draw}
                onChange={(e) => setParams('live_draw', e.target.checked)}
              />
              <div className={params.live_draw ? "inline-sort-div-active" : "inline-sort-div-inactive"}>
                {t('create_campaign_page.live_draw')}
                <Tooltip title={t('tooltips.live_draw')}>
                  <img src={params.live_draw ? images.question_icon : images.question_mark_gray_icon} width={26} height={26} alt="" />
                </Tooltip>
              </div>
            </div>
          </div>
          {params.campaign_type === 'giveaway' &&
            <div className="m-3">
              <div className="d-flex align-items-center justify-content-between mt-4">
                <Checkbox
                  checked={params.limit_participants}
                  onChange={(e) => setParams('limit_participants', e.target.checked)}
                />
                <div className={params.limit_participants ? "inline-sort-div-active" : "inline-sort-div-inactive"}>
                  {t('create_campaign_page.limit_participants')}
                  <Tooltip title={t('tooltips.limit_participants')}>
                    <img src={params.limit_participants ? images.question_icon : images.question_mark_gray_icon} width={26} height={26} alt="" />
                  </Tooltip>
                </div>
              </div>
            </div>
          }
          {(params.limit_participants && params.campaign_type === 'giveaway') &&
            <div style={{ width: 250, marginLeft: 65 }}>
              <div className="footer-link-bold mb-3 mt-4">{t('create_campaign_page.maximum_number_of_participants')}</div>
              <Input
                value={params.limitation_participation}
                onChange={(e) => setParams('limitation_participation', e.target.value)}
                className="custom-form-control"
                type="number"
              />
            </div>
          }
          <div className="m-3">
            <Radio.Group value={params.public_promotion} onChange={(e) => setParams('public_promotion', e.target.value)} style={{ display: 'block' }}>
              <div className="d-flex align-items-center justify-content-between">
                <Radio value="public" />
                <div className={params.public_promotion === 'public' ? "inline-sort-div-active" : "inline-sort-div-inactive"}>
                  {t('create_campaign_page.public')}
                  <Tooltip title={t('tooltips.public')}>
                    <img src={params.public_promotion === 'public' ? images.question_icon : images.question_mark_gray_icon} width={26} height={26} alt="" />
                  </Tooltip>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-4">
                <Radio value="private" />
                <div className={params.public_promotion === 'private' ? "inline-sort-div-active" : "inline-sort-div-inactive"}>
                  {t('create_campaign_page.private')}
                  <Tooltip title={t('tooltips.private')}>
                    <img src={params.public_promotion === 'private' ? images.question_icon : images.question_mark_gray_icon} width={26} height={26} alt="" />
                  </Tooltip>
                </div>
              </div>
            </Radio.Group>
          </div>
        </div>
        <Row>
          <Col className="d-flex justify-content-between">
            <Button
              type="primary"
              className="ant-blue-btn my-5"
              style={{ width: 180 }}
              onClick={onBack}
            >
              {t('button_group.back')}
            </Button>
            <Button
              type="primary"
              className="ant-blue-btn my-5"
              style={{ width: 150 }}
              onClick={() => setSection('action')}
            >
              {t('button_group.next')}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default CampaignType