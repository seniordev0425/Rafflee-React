import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { twitchConnect } from '../../actions/userInfo'
import { openNotification } from '../../utils/notification'
import Loading from '../../components/common/Loading'
import { useTranslation } from 'react-i18next'

function TwitchAuthPage(props) {
    const { t } = useTranslation()

    const { history } = props
    const SUCCESS_TWITCH_CONNECT = useSelector(state => state.userInfo.SUCCESS_TWITCH_CONNECT)
    const dispatch = useDispatch()

    useEffect(() => {
        let search = window.location.search
        let params = new URLSearchParams(search)
        let body = {
            token: params.get('code')
        }
        dispatch(twitchConnect(body))
    }, [])

    useEffect(() => {
        if (SUCCESS_TWITCH_CONNECT) {
            dispatch({ type: 'INIT_STATE', state: 'SUCCESS_TWITCH_CONNECT', data: false })
            openNotification('success', t('social_oauth.twitch'))
            history.push('/user-account')
        }
    }, [SUCCESS_TWITCH_CONNECT])

    const parseParms = (str) => {
        var pieces = str.split("&"), data = {}, i, parts
        // process each query pair
        for (i = 0; i < pieces.length; i++) {
            parts = pieces[i].split("=")
            if (parts.length < 2) {
                parts.push("")
            }
            data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
        }
        return data
    }

    return (
        <>
            <Loading />
        </>
    )
}

export default withRouter(TwitchAuthPage)