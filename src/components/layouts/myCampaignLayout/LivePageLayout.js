import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Button} from 'reactstrap'
import { Select } from 'antd'
import images from '../../../utils/images'
import Congratulation from '../../modals/Congratulation'
import {getCampaignParticipants, getCampaignWinnings, drawCampaign} from '../../../apis/apiCalls'
import Loading from '../../common/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons'
import { openNotification } from '../../../utils/notification'

function LivePageLayout(props){

    const {id, goBack} = props

    const { Option } = Select

    const [children, setChildren] = useState([])
    const [participantsNumber, setParticipantsNumber] = useState(0)
    const [participants, setParticipants] = useState([])
    const [open, setOpen] = useState(false)
    const [drawType, setDrawType] = useState('draw_by_gift')
    const [winningType, setWinningType] = useState('')
    const [winnerArr, setWinnerArr] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)

        getCampaignParticipants(id)
        .then(response => response.text())
        .then(result => {
            setIsLoading(false)
            var json_rlt = JSON.parse(result)
            setParticipantsNumber(json_rlt.number_of_participants)
            setParticipants(json_rlt.participants)
        })
        .catch(error => console.log('error', error));

        getCampaignWinnings(id)
        .then(response => response.text())
        .then(result => {
            var json_rlt = JSON.parse(result)
            let temp = []
            for (let i = 0; i < json_rlt.result_data.length; i ++)
                temp.push(<Option key={i} value={json_rlt.result_data[i].name}>{json_rlt.result_data[i].name}</Option>)
            setChildren(temp)
        })
        .catch(error => console.log('error', error));

    },[])


    const onToggle = () => {
        setOpen(!open)
    }

    const renderParticipants = () => {
        return (
            (participants || []).map((item, index) => 
                <Row key={index} className="pt-3 pb-3" style={!(index % 2) ? {background:"rgba(191, 232, 254, 0.25)"} : {background:"white"}}>
                    <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                        <div className="float-left" style={{fontSize:"1.1rem"}}>{item.username}</div>
                        <div className="float-right view-profile-link">View Profile</div>
                    </Col>
                </Row>
            )
        )
    }

    const handleDrawType = (value) => {
        setDrawType(value)
    }

    const handleWinningType = (value) => {
        setWinningType(value)
    }

    const onSubmit = () => {
        console.log(id, drawType, winningType)
        drawCampaign(id, drawType, winningType)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            var json_rlt = JSON.parse(result)
            if (json_rlt.status === 200){
                if (drawType === 'draw_by_gift' || drawType === 'draw')
                    setWinnerArr([{username: json_rlt.winner.username, winning: json_rlt.winner.winning, picture_profile: json_rlt.winner.picture_profile}])
                else setWinnerArr(json_rlt.winners)

                onToggle()
            }
            else openNotification('warning', 'All winning object are distributed.')
        })
        .catch(error => console.log('error', error));
    }

    if (isLoading) {
        return <Loading/>
    }

    return(
        <>
            <Row className="mt-4 mb-3">
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                    <div className="float-left blue-link-btn" onClick={() => goBack(null)}>Back to Campaign Page</div>
                    <div className="float-right"><img src={images.video_player}/></div>
                </Col>
            </Row>
            <Row className="mt-5 mb-3">
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                    <div className="float-left" style={{fontSize:"1.1rem", fontWeight:"bold"}}>Participants ({participantsNumber})</div>
                    <div className="float-right">
                        <FontAwesomeIcon icon={faSearch}/>
                        <FontAwesomeIcon icon={faSlidersH} className="ml-3"/>
                    </div>
                </Col>
            </Row>
            {renderParticipants()}
            <Row className="mt-5 mb-5">
                <Col xs="12" sm={{size: 10, offset: 1}}>
                    <Row>
                        <Col xs="12" sm="4">
                            <span className="footer-link-bold mr-3">Draw Type: </span>
                            <Select defaultValue="draw_by_gift" onChange={handleDrawType} size="large" style={{width: 180}}>
                                <Option value="draw_by_gift">DRAW BY GIFT</Option>
                                <Option value="draw_all_by_gift">DRAW ALL BY GIFT</Option>
                                <Option value="draw">DRAW</Option>
                                <Option value="draw_all">DRAW ALL</Option>
                            </Select>
                        </Col>
                        <Col xs="12" sm="4">
                            {(drawType === 'draw_by_gift' || drawType === 'draw_all_by_gift') && (
                                <>
                                <span className="footer-link-bold mr-3">Winning Type: </span>
                                <Select onChange={handleWinningType} size="large" style={{width: 180}}>
                                    {children}
                                </Select>
                                </>
                            )}
                        </Col>
                        <Col xs="12" sm="4">
                            <Button
                                color="primary"
                                className="blue-btn float-right"
                                style={{width: 160}}
                                onClick={onSubmit}
                            >
                                Draw
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Congratulation open={open} onToggle={onToggle} winnerArr={winnerArr}/>
        </>
    )
}

export default LivePageLayout;