import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Input } from 'reactstrap'
import QRCode from "react-qr-code"

import CampaignRulesModal from '../../../modals/CampaignRulesModal'

import { getCampaignRules } from '../../../../actions/campaign'

import images from '../../../../utils/images'
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

  const [isQRcodeExpanded, setIsQRcodeExpanded] = useState(false)
  const [openRulesModal, setOpenRulesModal] = useState(false)

  useEffect(() => {
    if (GET_CAMPAIGN_RULES_SUCCESS) {
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_GET_CAMPAIGN_RULES', data: false })
      setOpenRulesModal(true)
    }
  }, [GET_CAMPAIGN_RULES_SUCCESS])

  const downloadQR = () => {
    const parent = document.querySelector('.qrcode');
    const svg = parent.firstChild
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

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
            <a href={`${window.location.host}/campaign-detail/${created_promotion_id}`}>{`${window.location.host}/campaign-detail/${created_promotion_id}`}</a>
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
          <div className="footer-link-bold mt-5 mb-3">
            <div className="d-flex align-items-center">
              <span>{t('create_campaign_page.campaign_qrcode')}</span>
              <div className="ml-3 pointer" onClick={() => setIsQRcodeExpanded(true)}>
                <QRCode
                  value={`${window.location.host}/campaign-detail/${created_promotion_id}`}
                  size={40}
                />
              </div>
            </div>
            {isQRcodeExpanded &&
              <div className="d-flex justify-content-center">
                <div className="mt-5">
                  <div className="qrcode">
                    <QRCode
                      value={`${window.location.host}/campaign-detail/${created_promotion_id}`}
                      size={240}
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-3 pointer" onClick={downloadQR}>
                    <img src={images.ic_download} width="50" height="50" alt="download" />
                  </div>
                </div>
              </div>
            }
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

      <CampaignRulesModal
        open={openRulesModal}
        onToggle={() => setOpenRulesModal(!openRulesModal)}
        rules={campaignRules}
      />
    </Row>
  )
}

export default ResumeSection