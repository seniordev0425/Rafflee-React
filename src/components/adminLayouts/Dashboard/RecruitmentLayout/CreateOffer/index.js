import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form as FinalForm, Field } from 'react-final-form'
import {
  Form,
  Row,
  Col
} from 'reactstrap'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import {
  Select,
  Checkbox,
  DatePicker,
  Button
} from 'antd'

import Loading from '../../../../../components/common/Loading'
import FormInput from '../../../../common/FormInput'
import AddTagModal from '../../../../modals/Admin/AddRecruitmentTag'
import RemoveTagModal from '../../../../modals/Admin/RemoveRecruitmentTag'

import {
  getRecruitmentTags,
  createRecruitment
} from '../../../../../actions/admin/recruitment'

import { required } from '../../../../../utils/validation'

const { Option } = Select

const CreateOffer = () => {
  const { t } = useTranslation()
  const tags = useSelector(state => state.adminRecruitment.tags)
  const ADMIN_GET_RECRUITMENT_TAGS_PROCESS = useSelector(state => state.userInfo.ADMIN_GET_RECRUITMENT_TAGS)
  const ADMIN_CREATE_RECRUITMENT_PROCESS = useSelector(state => state.userInfo.ADMIN_CREATE_RECRUITMENT)
  const dispatch = useDispatch()

  const [tag, setTag] = useState([])
  const [active, setActive] = useState(true)
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'))

  const [openAddTagModal, setOpenAddTagModal] = useState(false)
  const [openRemoveTagModal, setOpenRemoveTagModal] = useState(false)

  useEffect(() => {
    dispatch(getRecruitmentTags())
  }, [])

  const onSubmit = (values) => {
    var body = {
      title: values.title,
      description: values.description,
      about_you: values.about_you,
      goals: values.goals,
      tag: JSON.stringify(tag),
      active: active,
      end_date: endDate
    }
    dispatch(createRecruitment(body))
  }

  if (ADMIN_GET_RECRUITMENT_TAGS_PROCESS) {
    return (
      <div className="min-height-container">
        <Loading />
      </div>
    )
  }

  return (
    <div className="px-4">
      <Row>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="color-blue font-size-14 font-weight-bold mt-4">
                  {t('career_page.title')}
                </div>
                <Field
                  name="title"
                  component={FormInput}
                  className="custom-form-control"
                  type="text"
                  validate={required(t('admin_recruitment_page.required_field'))}
                />
                <div className="color-blue font-size-14 font-weight-bold mt-4">
                  {t('career_page.description')}
                </div>
                <Field
                  name="description"
                  component={FormInput}
                  className="company-contact-form-text-area"
                  type="textarea"
                  validate={required(t('admin_recruitment_page.required_field'))}
                />
                <div className="color-blue font-size-14 font-weight-bold mt-4">
                  {t('career_page.about_you')}
                </div>
                <Field
                  name="about_you"
                  component={FormInput}
                  className="company-contact-form-text-area"
                  type="textarea"
                  validate={required(t('admin_recruitment_page.required_field'))}
                />
                <div className="color-blue font-size-14 font-weight-bold mt-4">
                  {t('career_page.what_you_will_do')}
                </div>
                <Field
                  name="goals"
                  component={FormInput}
                  className="company-contact-form-text-area"
                  type="textarea"
                  validate={required(t('admin_recruitment_page.required_field'))}
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
                <span className="pointer" onClick={() => setOpenAddTagModal(true)}>
                  <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>+ </span>
                  {t('admin_recruitment_page.add_tag')}
                </span>
                <span className="pointer ml-4" onClick={() => setOpenRemoveTagModal(true)}>
                  <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>- </span>
                  {t('admin_recruitment_page.remove_tag')}
                </span>
                <div className="mt-4">
                  <span className="color-blue font-size-14 font-weight-bold">
                    {t('career_page.active')}
                  </span>
                  <Checkbox
                    className="ml-3"
                    checked={active}
                    onChange={() => setActive(!active)}
                  />
                </div>
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
                <div className="my-5 d-flex justify-content-end">
                  <Button
                    htmlType='submit'
                    type="primary"
                    className="ant-blue-btn mt-2"
                    style={{ width: 200 }}
                    loading={ADMIN_CREATE_RECRUITMENT_PROCESS}
                  >
                    {!ADMIN_CREATE_RECRUITMENT_PROCESS && t('button_group.create')}
                  </Button>
                </div>
              </Form>
            )}
          />
        </Col>
      </Row>
      <AddTagModal
        open={openAddTagModal}
        onToggle={() => setOpenAddTagModal(!openAddTagModal)}
        onClose={() => setOpenAddTagModal(false)}
      />
      <RemoveTagModal
        open={openRemoveTagModal}
        onToggle={() => setOpenRemoveTagModal(!openRemoveTagModal)}
        onClose={() => setOpenRemoveTagModal(false)}
        tags={tags}
      />
    </div>
  )
}

export default CreateOffer