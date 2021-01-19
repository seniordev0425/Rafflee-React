import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Input } from 'reactstrap'

import { getCampaignRules } from '../../../../actions/campaign'

import { printPreview } from '../../../../utils/pdf'
import { useTranslation } from 'react-i18next'

function ResumeSection(props) {
  const { t } = useTranslation()

  const { params } = props

  // Following Redux state is defined in reducer with comments
  const created_promotion_id = useSelector(state => state.campaign.created_promotion_id)
  const GET_CAMPAIGN_RULES_SUCCESS = useSelector(state => state.userInfo.SUCCESS_GET_CAMPAIGN_RULES)
  const GET_CAMPAIGN_RULES_PROCESS = useSelector(state => state.userInfo.GET_CAMPAIGN_RULES)
  const campaignRules = useSelector(state => state.campaign.campaignRules)

  const dispatch = useDispatch()

  useEffect(() => {
    if (GET_CAMPAIGN_RULES_SUCCESS) {
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_GET_CAMPAIGN_RULES', data: false })
      printPreview(campaignRules)
    }
  }, [GET_CAMPAIGN_RULES_SUCCESS])

  return (
    <Row>
      <Col sm={{ size: "10", offset: "1" }} xs="12" className="padding-x">
        <div className="mt-5 mb-3 mx-3">
          <div
            className="pl-3 py-2 d-flex align-items-center font-size-9"
            style={{ backgroundColor: '#DFF0D8', borderRadius: 6, color: '#4F8D4E' }}
          >
            {t(`create_campaign_page.${params.campaign_type}_campaign_create_success`)}
          </div>
          <div className="footer-link-bold mt-5 mb-3">{t('create_campaign_page.campaign_link')}</div>
          <div
            className="px-3 py-2 mb-5 d-flex align-items-center font-size-9 color-blue"
            style={{ borderRadius: 6, border: '1px solid #DEE6E9' }}
          >
            <a href={`https://rafflee.io/campaign-detail/${created_promotion_id}`}>{`https://rafflee.io/campaign-detail/${created_promotion_id}`}</a>
          </div>
          <div className="footer-link-bold mt-5 mb-3">{t('create_campaign_page.embed_page_blog_post')}</div>
          <Input
            type="textarea"
            size="5"
            className="custom-form-control footer-link"
            defaultValue=''
          />
          <div
            className="footer-link-bold mt-5 mb-3 pointer"
            onClick={() => dispatch(getCampaignRules(created_promotion_id))}
          >
            {GET_CAMPAIGN_RULES_PROCESS ? t('create_campaign_page.loading') : t('create_campaign_page.rules')}
          </div>
          <div className="footer-link-bold mt-5 mb-3">{t('create_campaign_page.add_tab_site')}</div>
          <div
            className="px-3 py-2 mb-5 d-flex align-items-center justify-content-between font-size-9 color-blue"
            style={{ backgroundColor: '#F4FBFF', borderRadius: 6, border: '1px solid #BAE1FF' }}
          >
            <span>{t(`create_campaign_page.need_to_pay_text`)}</span>
            <span>{t(`create_campaign_page.pay`)}</span>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default ResumeSection