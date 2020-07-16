import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import AppLayout from '../components/layouts/AppLayout'
import SearchResultLayout from '../components/layouts/searchResultLayout'

function SearchResult(props) {

    useEffect(() => {
        document.title = 'Search'
    }, [])

    return (
        <AppLayout>
            <SearchResultLayout searchKey={props.location.state.searchKey} />
        </AppLayout>
    )
}

export default withRouter(SearchResult)