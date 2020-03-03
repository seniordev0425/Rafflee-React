import React from 'react'
import {Card, Button, CardBody, CardText, CardTitle, CardImg} from 'reactstrap'
import { Link } from 'react-router-dom'
import images from '../../../utils/images'

function CampaignCard(props){
    const {description, campaign_name, pk} = props
    return(
        <div className="item campaign-card-body">
            <div>
                <div className="campaign-card-img"><img src={images.profile_img}/></div>
                <div className="mt-4 campaign-card-title">{campaign_name}</div>
                <div className="mt-4 campaign-card-text">{description}</div>
            </div>
            
            <div>
                <Link to={"/campaign-detail/" + pk}>
                    <Button size="lg" color="primary" className="bootstrap-blue-btn">
                        SEE CAMPAIGN
                    </Button>
                </Link>
            </div>
            <div className="campaign-card-star" >
                    <img src={images.star}/>
            </div>
        </div>
    )
}

export default CampaignCard;