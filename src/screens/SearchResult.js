import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import SearchResultLayout from '../components/layouts/searchResultLayout'

function SearchResult(props) {

    useEffect(() => {
        document.title = 'Search'
    }, [])

    return (
        <div style={{ fontFamily: "sofiapro" }}>
           <div className="parent-header-container">
                <JoinHeader />
                <Header />
            </div>
            <SearchResultLayout searchKey={props.location.state.searchKey} />
            <FooterLink />
            <Footer />
        </div>
    )
}

export default withRouter(SearchResult)