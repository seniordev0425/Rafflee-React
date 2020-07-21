import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox, Select } from 'antd'
import { getFacebookPublications } from '../../../../../actions/social'
import images from '../../../../../utils/images'

import { useTranslation } from 'react-i18next'

const { Option } = Select

function FacebookLikeField(props) {
  const { t } = useTranslation()

  const { params, setAction } = props

  // Following Redux states are defined in reducer with comments
  const facebookPages = useSelector(state => state.social.facebookPages)
  const facebookPublications = useSelector(state => state.social.facebookPublications)
  const dispatch = useDispatch()

  // Fetch facebook publications when switch facebook pages
  const fetchPublications = (id) => {
    var body = {
      page_id: facebookPages[id].id,
      page_access_token: facebookPages[id].access_token
    }
    dispatch(getFacebookPublications(body))
  }

  return (
    <div className="mt-3 mt-sm-5">
      <div
        className="d-flex justify-content-between align-items-center px-2 px-sm-4"
        style={{ height: 50, backgroundColor: '#4264A3', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      >
        <div className="d-flex align-items-center">
          <img src={images.facebook_action_icon} width={10} height={16} alt="" />
          <span className="ml-3">{t('create_campaign_page.like')}</span>
        </div>
        <div>
          <Tooltip title="Tooltip will show on mouse enter.">
            <img src={images.question_mark_white_icon} width={22} alt="" />
          </Tooltip>
          <span
            className="ml-3 pointer"
            onClick={() => setAction('facebook', 'like', false)}
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
              className="w-100"
              placeholder={t('create_campaign_page.select_page')}
              onChange={(id) => fetchPublications(id)}
              size="large"
            >
              {facebookPages.map((page, id) => (
                <Option key={id} value={id}>
                  {page.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs="12" sm="6" className="p-0 pl-sm-2 mt-3 mt-sm-0">
            <Select
              defaultValue={params.facebook.like_id}
              className="w-100"
              placeholder={t('create_campaign_page.select_publication')}
              onChange={(id) => setAction('facebook', 'like_id', id)}
              size="large"
            >
              {facebookPublications.map((publication) => (
                <Option key={publication.id} value={publication.id}>
                  {publication.message}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs="12" sm="6" className="p-0 pr-sm-2">
            <Input
              value={params.facebook.like_entries}
              onChange={(e) => setAction('facebook', 'like_entries', e.target.value)}
              className="custom-form-control w-100"
              type="number"
              placeholder={t('create_campaign_page.entries')}
            />
          </Col>
          <Col xs="12" sm="6" className="p-0 d-flex align-items-center justify-content-end mt-3 mt-sm-0">
            <Checkbox checked={params.facebook.like_mandatory} onChange={(e) => setAction('facebook', 'like_mandatory', e.target.checked)} />
            <span className="ml-3 footer-link">{t('create_campaign_page.mandatory')}</span>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default FacebookLikeField