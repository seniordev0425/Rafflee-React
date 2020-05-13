import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import { Checkbox } from 'antd'
import { followCircle } from '../../actions/userInfo'
import { useTranslation } from 'react-i18next'

function CircleFollowModal(props) {
    const { t } = useTranslation()
    const { open, onToggle, pk } = props

    const FOLLOW_CIRCLE_PROCESS = useSelector(state => state.userInfo.FOLLOW_CIRCLE)
    const FOLLOW_CIRCLE_SUCCESS = useSelector(state => state.userInfo.SUCCESS_FOLLOW_CIRCLE)
    const dispatch = useDispatch()
    
    const [joinCircle, setJoinCircle] = useState(false)
    const [newsletter, setNewsletter] = useState(false)


    useEffect(() => {
        if (FOLLOW_CIRCLE_SUCCESS) {
            dispatch({type: 'INIT_STATE', state: 'SUCCESS_FOLLOW_CIRCLE', data: false })
            onToggle()
        }
    }, [FOLLOW_CIRCLE_SUCCESS])

    const subscribe = () => {
        var body = {
            joign_cercle: joinCircle,
            newsletter: newsletter
        }
        dispatch(followCircle(body, pk))
    }
    return (
        <Modal isOpen={open} toggle={onToggle} >
            <ModalHeader toggle={onToggle}><div className="text-center font-size-19 color-blue">{t('company_page.follow_circle')}</div></ModalHeader>
            <ModalBody>
                <div>
                    <Checkbox checked={joinCircle} onChange={() => setJoinCircle(!joinCircle)}>{t('company_page.follow_circle')}</Checkbox>
                </div>
                <div className="mt-3">
                    <Checkbox checked={newsletter} onChange={() => setNewsletter(!newsletter)}>{t('company_page.newsletter')}</Checkbox>
                </div>
                <div className="d-flex justify-content-center">
                    <Button 
                        onClick={subscribe}
                        className="btn blue-btn mt-3 participate-btn-size" 
                        color="primary" 
                        disabled={FOLLOW_CIRCLE_PROCESS}
                    >
                        {t('button_group.continue')}
                    </Button>
                </div>
            </ModalBody>

        </Modal>
    )
}

export default CircleFollowModal;