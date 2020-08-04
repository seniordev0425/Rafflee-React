import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox, Select } from 'antd'
import images from '../../../../../utils/images'

import { useTranslation } from 'react-i18next'

const { Option } = Select

function FacebookPageField(props) {
  const { t } = useTranslation()

  const { params, setAction } = props

  // Following Redux states are defined in reducer with comments
  const facebookPages = useSelector(state => state.social.facebookPages)

  useEffect(() => {
    // Set default facebook page
    if (facebookPages.length) {
      if (params.facebook.page_page_id === '') {
        setAction('facebook', 'page_page_id', facebookPages[0].id)
        setAction('facebook', 'page_page_name', facebookPages[0].name)
      }
    }
  }, [facebookPages])

  // Update page id and page name
  const updatePage = (id) => {
    facebookPages.forEach((page) => {
      if (page.id === id) {
        setAction('facebook', 'page_page_id', id)
        setAction('facebook', 'page_page_name', page.name)
      }
    })
  }

  return (
    <div className="mt-3 mt-sm-5">
      <div
        className="d-flex justify-content-between align-items-center px-2 px-sm-4"
        style={{ height: 50, backgroundColor: '#4264A3', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      >
        <div className="d-flex align-items-center">
          <img src={images.facebook_action_icon} width={10} height={16} alt="" />
          <span className="ml-3">{t('create_campaign_page.page')}</span>
        </div>
        <div>
          <Tooltip title="Tooltip will show on mouse enter.">
            <img src={images.question_mark_white_icon} width={22} alt="" />
          </Tooltip>
          <span
            className="ml-3 pointer"
            onClick={() => setAction('facebook', 'page', false)}
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
          <Col xs="12" sm="6" className="p-0 pr-sm-2">
            <Select
              value={params.facebook.page_page_id}
              className="w-100"
              placeholder={t('create_campaign_page.select_page')}
              onChange={(id) => updatePage(id)}
              size="large"
            >
              {facebookPages.map((page) => (
                <Option key={page.id} value={page.id}>
                  {page.name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row className="mt-3">
          <div>
            <Checkbox
              checked={params.facebook.page_follow}
              onChange={(e) => setAction('facebook', 'page_follow', e.target.checked)}
            >
              {t('create_campaign_page.follow')}
            </Checkbox>
            <Checkbox
              checked={params.facebook.page_share}
              onChange={(e) => setAction('facebook', 'page_share', e.target.checked)}
            >
              {t('create_campaign_page.share')}
            </Checkbox>
          </div>
        </Row>
        <Row className="mt-5">
          <Col xs="12" sm="6" className="p-0 pr-sm-2">
            <Input
              value={params.facebook.page_entries}
              onChange={(e) => setAction('facebook', 'page_entries', e.target.value)}
              className="custom-form-control w-100"
              type="number"
              placeholder={t('create_campaign_page.entries')}
            />
          </Col>
          <Col xs="12" sm="6" className="p-0 d-flex align-items-center justify-content-end mt-3 mt-sm-0">
            <Checkbox checked={params.facebook.page_mandatory} onChange={(e) => setAction('facebook', 'page_mandatory', e.target.checked)} />
            <span className="ml-3 footer-link">{t('create_campaign_page.mandatory')}</span>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default FacebookPageField