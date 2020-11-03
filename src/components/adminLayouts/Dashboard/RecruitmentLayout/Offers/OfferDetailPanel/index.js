import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Input } from 'reactstrap'
import {
  Select,
  DatePicker,
  Button
} from 'antd'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import Loading from '../../../../../../components/common/Loading'

import {
  getRecruitmentTags,
  updateRecruitment
} from '../../../../../../actions/admin/recruitment'

const { Option } = Select

const OfferDetailPanel = ({ selectedOffer, onChangeSection }) => {
  const { t } = useTranslation()

  const tags = useSelector(state => state.adminRecruitment.tags)
  const ADMIN_GET_RECRUITMENT_TAGS_PROCESS = useSelector(state => state.userInfo.ADMIN_GET_RECRUITMENT_TAGS)
  const ADMIN_UPDATE_RECRUITMENT_PROCESS = useSelector(state => state.userInfo.ADMIN_UPDATE_RECRUITMENT)
  const dispatch = useDispatch()

  const [title, setTitle] = useState(selectedOffer.title)
  const [description, setDescription] = useState(selectedOffer.description)
  const [aboutYou, setAboutYou] = useState(selectedOffer.about_you)
  const [goals, setGoals] = useState(selectedOffer.goals)
  const [tag, setTag] = useState(selectedOffer.tag)
  const [active, setActive] = useState(true)
  const [endDate, setEndDate] = useState(selectedOffer.end_date)

  useEffect(() => {
    dispatch(getRecruitmentTags())
  }, [])

  const updateOffer = () => {
    var body = {
      pk: selectedOffer.pk,
      title: title,
      description: description,
      about_you: aboutYou,
      goals: goals,
      tag: JSON.stringify(tag),
      active: active,
      end_date: endDate
    }
    dispatch(updateRecruitment(body))
  }

  if (ADMIN_GET_RECRUITMENT_TAGS_PROCESS) {
    return (
      <div className="min-height-container">
        <Loading />
      </div>
    )
  }

  return (
    <Row className="px-4">
      <Col sm={{ size: "10", offset: "1" }} xs="12" className="padding-x">
        <div className="color-blue font-size-14 font-weight-bold mt-4">
          {t('career_page.title')}
        </div>
        <Input
          type="text"
          className="custom-form-control mt-3"
          placeholder={t('create_campaign_page.campaign_name')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="color-blue font-size-14 font-weight-bold mt-4">
          {t('career_page.description')}
        </div>
        <Input
          type="textarea"
          className="company-contact-form-text-area mt-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
        <div className="color-blue font-size-14 font-weight-bold mt-4">
          {t('career_page.about_you')}
        </div>
        <Input
          type="textarea"
          className="company-contact-form-text-area mt-3"
          value={aboutYou}
          onChange={(e) => setAboutYou(e.target.value)}
          rows={5}
        />
        <div className="color-blue font-size-14 font-weight-bold mt-4">
          {t('career_page.what_you_will_do')}
        </div>
        <Input
          type="textarea"
          className="company-contact-form-text-area mt-3"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          rows={5}
        />
        <div className="color-blue font-size-14 font-weight-bold mt-4">
          {t('career_page.tags')}
        </div>
        <Select
          value={tag}
          mode="multiple"
          className="w-100"
          onChange={(val) => setTag(val)}
          size="large"
        >
          {tags.map((tag, index) => (
            <Option key={index} value={tag}>
              {tag}
            </Option>
          ))}
        </Select>
        <div className="color-blue font-size-14 font-weight-bold mt-4">
          {t('career_page.end_date')}
        </div>
        <DatePicker
          value={endDate ? moment(endDate, 'YYYY-MM-DD') : null}
          onChange={(date, dateString) => setEndDate(dateString)}
          placeholder="YYYY-MM-DD"
          className="ant-date-picker half-width"
          format="YYYY-MM-DD"
        />
        <div className="d-flex justify-content-between">
          <Button
            type="primary"
            className="ant-blue-btn my-5"
            style={{ width: 150 }}
            onClick={() => onChangeSection('offersPanel')}
          >
            {t('button_group.back')}
          </Button>
          <Button
            type="primary"
            className="ant-blue-btn my-5"
            style={{ width: 150 }}
            onClick={updateOffer}
            loading={ADMIN_UPDATE_RECRUITMENT_PROCESS}
          >
            {!ADMIN_UPDATE_RECRUITMENT_PROCESS && t('button_group.save')}
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default OfferDetailPanel