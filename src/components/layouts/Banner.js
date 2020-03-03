import React, { useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import {Container,Row, Col} from 'reactstrap'
import {Input} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Banner(props){
    return(
        <div className="banner">
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
                <Input placeholder="Search..." className="banner-search-input"></Input>
                <div className="banner-search-btn"><FontAwesomeIcon icon={faSearch} className="banner-search-icon"/></div>
            </div>
        </div>
    )
}

export default Banner;