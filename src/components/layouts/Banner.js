import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

function Banner(props) {
    const { t } = useTranslation()

    const { history } = props
    const [searchKey, setSearchKey] = useState('')

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            gotoSearchResult()
        }
    }

    const gotoSearchResult = () => {
        history.push({
            pathname: '/search-result',
            state: {
                searchKey: searchKey
            }
        })
    }

    return (
        <div className="banner font-weight-bold banner-text">
            <div>
                <span className="banner-text-blue">Thousands of </span>
                <span className="banner-text-green"> prizes </span>
            </div>
            <div>
                <span className="banner-text-blue">and </span>
                <span className="banner-text-purple"> giveaways </span>
                <span className="banner-text-blue">for you.</span>
            </div>
            <div className="banner-search">
                <Input placeholder={t('banner.search_placeholder')} className="banner-search-input" onChange={(e) => setSearchKey(e.target.value)} onKeyPress={handleKeyPress}></Input>
                <div className="banner-search-btn" onClick={gotoSearchResult}><FontAwesomeIcon icon={faSearch} className="banner-search-icon" /></div>
            </div>
        </div>
    )
}

export default withRouter(Banner)