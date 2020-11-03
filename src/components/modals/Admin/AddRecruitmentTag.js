import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Form as FinalForm, Field } from 'react-final-form'
import {
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'
import { Button } from 'antd'
import FormInput from '../../common/FormInput'
import { required } from '../../../utils/validation'
import { createRecruitmentTag } from '../../../actions/admin/recruitment'
import { useTranslation } from 'react-i18next'

function AddRecruitmentTag(props) {
  const { t } = useTranslation()

  const { open, onToggle, onClose } = props
  const ADMIN_CREATE_RECRUITMENT_TAG_PROCESS = useSelector(state => state.userInfo.ADMIN_CREATE_RECRUITMENT_TAG)
  const ADMIN_CREATE_RECRUITMENT_TAG_SUCCESS = useSelector(state => state.userInfo.SUCCESS_ADMIN_CREATE_RECRUITMENT_TAG)
  const dispatch = useDispatch()

  useEffect(() => {
    if (ADMIN_CREATE_RECRUITMENT_TAG_SUCCESS) {
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_ADMIN_CREATE_RECRUITMENT_TAG', data: false })
      onClose()
    }
  }, [ADMIN_CREATE_RECRUITMENT_TAG_SUCCESS])

  const onSubmit = (values) => {
    dispatch(createRecruitmentTag({ tag: values.tag }, values.tag))
  }

  return <Modal isOpen={open} toggle={onToggle}>
    <ModalHeader className="modal-login-btn" style={{ borderBottom: 'none' }}>
      <div className="modal-login-btn">{t('admin_recruitment_page.add_tag')}</div>
    </ModalHeader>
    <ModalBody>
      <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Field
                name="tag"
                component={FormInput}
                className="custom-form-control"
                type="text"
                validate={required(t('admin_recruitment_page.required_field'))}
              />
            </FormGroup>
            <Button
              htmlType="submit"
              size="lg"
              type="primary"
              className="ant-blue-btn mt-4"
              loading={ADMIN_CREATE_RECRUITMENT_TAG_PROCESS}
            >
              {!ADMIN_CREATE_RECRUITMENT_TAG_PROCESS && t('button_group.add')}
            </Button>
          </Form>
        )}
      />
    </ModalBody>
  </Modal>
}

AddRecruitmentTag.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
}

export default AddRecruitmentTag
