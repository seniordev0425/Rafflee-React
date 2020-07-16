import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from "react-redux";
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Button } from 'antd'
import FormInput from '../common/FormInput'
import {
  required,
} from '../../utils/validation'

import { deleteAccount } from '../../actions/userInfo'

import { useTranslation } from 'react-i18next'

function DeleteAccount(props) {
  const { t } = useTranslation()

  const { open, onToggle, history } = props

  const isLoading = useSelector(state => state.userInfo.DELETE_ACCOUNT)
  const DELETE_ACCOUNT_SUCCESS = useSelector(state => state.userInfo.DELETE_ACCOUNT_SUCCESS)
  const dispatch = useDispatch()

  useEffect(() => {
    if (DELETE_ACCOUNT_SUCCESS) {
      dispatch({ type: "LOG_IN_SUCCESS", data: { token: '', company: false } })
      dispatch({ type: 'DELETE_ACCOUNT_SUCCESS', flag: false })
      localStorage.removeItem('token')
      localStorage.removeItem('company')
      sessionStorage.clear()
      history.push('/')
    }
  }, [DELETE_ACCOUNT_SUCCESS])

  const onSubmit = (values) => {
    dispatch(deleteAccount({ password: values.password }))
  }

  return (<Modal isOpen={open} toggle={onToggle}>
    <ModalHeader className="modal-login-btn" style={{ borderBottom: 'none' }}>
      <div className="modal-login-btn">{t('delete_account_modal.delete_account')}</div>
    </ModalHeader>
    <ModalBody>
      <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, values }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Field
                name="password"
                component={FormInput}
                className="custom-form-control"
                type="password"
                placeholder={t('delete_account_modal.password')}
                validate={required(t('delete_account_modal.password_required'))}
              />
            </FormGroup>

            <Button
              htmlType="submit"
              type="danger"
              className="ant-red-btn mt-4"
              loading={isLoading}
            >
              {!isLoading && t('button_group.delete_account')}
            </Button>
          </Form>
        )}
      />
    </ModalBody>
  </Modal>)
}

DeleteAccount.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    myInfo: state.userInfo.myInfo,
    token: state.userInfo.token,
    company: state.userInfo.company,
  }
}

export default compose(withRouter, connect(mapStateToProps))(DeleteAccount)
