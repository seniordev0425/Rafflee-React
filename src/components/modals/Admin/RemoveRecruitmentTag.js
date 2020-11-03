import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Form as FinalForm } from 'react-final-form'
import {
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'
import { Button, Select } from 'antd'

import { removeRecruitmentTag } from '../../../actions/admin/recruitment'
import { useTranslation } from 'react-i18next'

const { Option } = Select

function RemoveRecruitmentTag(props) {
  const { t } = useTranslation()

  const { open, onToggle, onClose, tags } = props
  const ADMIN_REMOVE_RECRUITMENT_TAG_PROCESS = useSelector(state => state.userInfo.ADMIN_REMOVE_RECRUITMENT_TAG)
  const ADMIN_REMOVE_RECRUITMENT_TAG_SUCCESS = useSelector(state => state.userInfo.SUCCESS_ADMIN_REMOVE_RECRUITMENT_TAG)
  const dispatch = useDispatch()

  const [tag, setTag] = useState('')

  useEffect(() => {
    if (ADMIN_REMOVE_RECRUITMENT_TAG_SUCCESS) {
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_ADMIN_REMOVE_RECRUITMENT_TAG', data: false })
      setTag('')
      onClose()
    }
  }, [ADMIN_REMOVE_RECRUITMENT_TAG_SUCCESS])

  const onSubmit = () => {
    if (!tag) return
    dispatch(removeRecruitmentTag({ tag: tag }, tag))
  }

  return <Modal isOpen={open} toggle={onToggle}>
    <ModalHeader className="modal-login-btn" style={{ borderBottom: 'none' }}>
      <div className="modal-login-btn">{t('admin_recruitment_page.remove_tag')}</div>
    </ModalHeader>
    <ModalBody>
      <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Select
                value={tag}
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
            </FormGroup>
            <Button
              htmlType="submit"
              size="lg"
              type="primary"
              className="ant-blue-btn mt-4"
              loading={ADMIN_REMOVE_RECRUITMENT_TAG_PROCESS}
            >
              {!ADMIN_REMOVE_RECRUITMENT_TAG_PROCESS && t('button_group.remove')}
            </Button>
          </Form>
        )}
      />
    </ModalBody>
  </Modal>
}

RemoveRecruitmentTag.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  tags: PropTypes.array
}

export default RemoveRecruitmentTag
