import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form as FinalForm } from 'react-final-form'
import {
  Form,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'
import { Button } from 'antd'

import { deleteAccount } from '../../actions/userInfo'

import { useTranslation } from 'react-i18next'

function DeleteAccount(props) {
  const { t } = useTranslation()

  const {
    open,
    onToggle,
    receivedToken,
    history
  } = props

  const company = useSelector(state => state.userInfo.company)
  const userProfile = useSelector(state => state.userInfo.userProfile)
  const companyProfile = useSelector(state => state.userInfo.companyProfile)
  const isLoading = useSelector(state => state.userInfo.DELETE_ACCOUNT)
  const DELETE_ACCOUNT_SUCCESS = useSelector(state => state.userInfo.SUCCESS_DELETE_ACCOUNT)
  const dispatch = useDispatch()

  useEffect(() => {
    if (DELETE_ACCOUNT_SUCCESS) {
      dispatch({ type: "LOG_IN_SUCCESS", data: { token: '', company: false } })
      dispatch({ type: 'SUCCESS_DELETE_ACCOUNT', flag: false })
      localStorage.removeItem('token')
      localStorage.removeItem('company')
      history.push('/')
    }
  }, [DELETE_ACCOUNT_SUCCESS])

  const onSubmit = () => {
    dispatch(deleteAccount({ token: receivedToken, email: company ? companyProfile.email : userProfile.email }))
  }

  return (<Modal isOpen={open} toggle={onToggle}>
    <ModalHeader toggle={onToggle} style={{ borderBottom: 'none' }}></ModalHeader>
    <ModalBody>
      <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="color-gray font-size-12 font-weight-bold mb-4 text-center">
              {t('delete_account_modal.confirm_text')}
            </div>
            <Button
              htmlType="submit"
              type="danger"
              className="ant-red-btn mt-4"
              loading={isLoading}
            >
              {!isLoading && t('button_group.yes')}
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

export default withRouter(DeleteAccount)
