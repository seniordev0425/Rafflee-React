import React from 'react'
import { Checkbox } from 'antd'

function TwitterActionMenu(props) {
    const { params, setAction } = props
    return (
        <div className="action-list-container">
            <div className="action-list-item">
                <label>LIKE</label>
                <Checkbox checked={params.twitter.like} onChange={(e) => setAction('twitter', 'like', e.target.checked)}/>
            </div>
            <div className="action-list-item">
                <label>FOLLOW</label>
                <Checkbox checked={params.twitter.follow} onChange={(e) => setAction('twitter', 'follow', e.target.checked)}/>
            </div>
            <div className="action-list-item">
                <label>MESSAGE</label>
                <Checkbox checked={params.twitter.tweet} onChange={(e) => setAction('twitter', 'tweet', e.target.checked)}/>
            </div>
            <div className="action-list-item">
                <label>RETWEET</label>
                <Checkbox checked={params.twitter.retweet} onChange={(e) => setAction('twitter', 'retweet', e.target.checked)}/>
            </div>
        </div>
    )
}

export default TwitterActionMenu