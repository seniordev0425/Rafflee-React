import React from 'react'
import { Checkbox } from 'antd'

function TwitchActionMenu(props) {
    const { params, setAction } = props
    return (
        <div className="action-list-container">
            <div className="action-list-item">
                <label>FOLLOW</label>
                <Checkbox checked={params.twitch.follow} onChange={(e) => setAction('twitch', 'follow', e.target.checked)}/>
            </div>
        </div>
    )
}

export default TwitchActionMenu