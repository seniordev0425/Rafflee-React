import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Button } from 'antd'
import { unfollowCircle } from '../../actions/userInfo'
import { useTranslation } from 'react-i18next'

function CircleUnfollowModal(props) {
    const { t } = useTranslation()
    const { open, onToggle, pk, companyName } = props

    const UNFOLLOW_CIRCLE_PROCESS = useSelector(state => state.userInfo.UNFOLLOW_CIRCLE)
    const UNFOLLOW_CIRCLE_SUCCESS = useSelector(state => state.userInfo.SUCCESS_UNFOLLOW_CIRCLE)
    const dispatch = useDispatch()

    useEffect(() => {
        if (UNFOLLOW_CIRCLE_SUCCESS) {
            dispatch({ type: 'INIT_STATE', state: 'SUCCESS_UNFOLLOW_CIRCLE', data: false })
            onToggle()
        }
    }, [UNFOLLOW_CIRCLE_SUCCESS])

    const subscribe = () => {
        dispatch(unfollowCircle(pk))
    }

    return (
        <Modal isOpen={open} toggle={onToggle} >
            <ModalHeader toggle={onToggle}><div className="text-center font-size-19 color-blue">{t('company_page.unfollow_circle')}</div></ModalHeader>
            <ModalBody>
                <div className="font-size-11 font-weight-bold">
                    {`${t('company_page.unfollow_question')} ${companyName}`}
                </div>
                <div className="d-flex justify-content-center">
                    <Button
                        onClick={subscribe}
                        className="ant-blue-btn mt-3 participate-btn-size"
                        type="primary"
                        loading={UNFOLLOW_CIRCLE_PROCESS}
                    >
                        {!UNFOLLOW_CIRCLE_PROCESS && t('button_group.continue')}
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default CircleUnfollowModal