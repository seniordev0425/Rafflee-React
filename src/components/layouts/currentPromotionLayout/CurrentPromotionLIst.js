import React, {useState} from 'react'
import {Menu} from 'antd'
import {Row, Col} from 'reactstrap'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import PromotionListItem from './PromotionListItem'

function CurrentPromotionList(props){

    const {highlightedPromotions, newPromotions, bestOfferPromotions, hotPromotions} = props
    const [currentMenu, setCurrentMenu] = useState('highlight')

    const changeMenu = (val) => {
        setCurrentMenu(val)
    }

    const promotionList = {
        highlight: highlightedPromotions,
        new: newPromotions,
        hot: hotPromotions,
        bestoffer: bestOfferPromotions
    }

    const renderPromotionList = () => {
        return(
            promotionList[currentMenu].map((item, index) => 
                <div key={index} className="promotion-list-item-container">        
                    <PromotionListItem item={item}/>
                </div>
            )
        )
    }
    return(
        <>
        <div className="menubar-container" style={{marginTop: "30px"}}>
            <Row>
                <Col xs="12" sm={{size: 10, offset: 1}}>
                    <Menu mode="horizontal" className="menubar" selectedKeys={[currentMenu]}>
                        <Menu.Item key="highlight" className="mr-5" onClick={() => changeMenu('highlight')}>
                            Highlights
                        </Menu.Item>
                        <Menu.Item key="new" className="mr-5" onClick={() => changeMenu('new')}>
                            New
                        </Menu.Item>
                        <Menu.Item key="hot" className="mr-5" onClick={() => changeMenu('hot')}>
                            Hot
                        </Menu.Item>
                        <Menu.Item key="bestoffer" className="mr-5" onClick={() => changeMenu('bestoffer')}>
                            End Soon
                        </Menu.Item>
                        <Menu.Item key="categories" className="float-right">
                            <FontAwesomeIcon icon={faSlidersH}/>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
        {renderPromotionList()}
                
        {promotionList[currentMenu].length > 10 && (
            <div className="promotion-list-more-btn">
                <Button
                    size="lg"
                    color="primary"
                    className="bootstrap-blue-btn"
                >
                        SEE MORE
                </Button>
            </div>
        )}
              
        {promotionList[currentMenu].length < 1 && (
            <div className="empty-result mt-5 mb-5">
                <span className="promotion-list-item-title">There is no result to display.</span>
            </div>
        )}
        
           
        </>
    )
}

CurrentPromotionList.propTypes = {
    highlightedPromotions:PropTypes.array.isRequired,
    newPromotions:PropTypes.array.isRequired,
    bestOfferPromotions:PropTypes.array.isRequired,
}

export default CurrentPromotionList;