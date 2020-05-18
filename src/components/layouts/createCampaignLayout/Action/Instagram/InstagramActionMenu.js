import React from 'react'
import { Checkbox } from 'antd'

function InstagramActionMenu(props) {
    const { params, setAction } = props
    return (
        <div className="action-list-container">
            <div className="action-list-item">
                <label>PROFILE</label>
                <Checkbox checked={params.instagram.profile} onChange={(e) => setAction('instagram', 'profile', e.target.checked)}/>
            </div>
            <div className="action-list-item">
                <label>PUBLICATION</label>
                <Checkbox checked={params.twitter.publication} onChange={(e) => setAction('twitter', 'publication', e.target.checked)}/>
            </div>
        </div>
    )
}

export default InstagramActionMenu