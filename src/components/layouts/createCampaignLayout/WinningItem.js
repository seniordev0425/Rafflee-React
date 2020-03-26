import React from 'react'
import { FormGroup, Input, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { required } from '../../../utils/validation'
import { useTranslation } from 'react-i18next'

function WinningItem(props){
    const { t } = useTranslation()

    const {id, item, removeWinning, setWinningVal} = props
    return(
        <Row>
            <Col xs="12" sm="4">
                <div className="mt-4 half-width">
                    <FormGroup>
                        <div className="footer-link-bold mb-3">{t('create_campaign_page.name_of_prizes')}</div>
                        <Input
                            name={"name" + id}
                            value={item.name}
                            onChange={(e) => setWinningVal(e, id, 'name')}
                            className="custom-form-control"
                            type="text"
                            required
                        />
                    </FormGroup>
                </div>
            </Col>
            <Col xs="12" sm="4">
                <div className="mt-4 full-width">
                    <FormGroup>
                        <div className="footer-link-bold mb-3">{t('create_campaign_page.type_of_prizes')}</div>
                        <Input
                            name={"winning_type" + id}
                            value={item.description}
                            onChange={(e) => setWinningVal(e, id, 'description')}
                            className="custom-form-control"
                            type="text" 
                            required  
                        />
                    </FormGroup>
                </div>
            </Col>
            <Col xs="12" sm="4" className="d-flex justify-content-between">
                <div className="mt-4 half-width">
                    <FormGroup>
                        <div className="footer-link-bold mb-3">{t('create_campaign_page.number_of_people')}</div>
                        <Input
                            name={"number" + id}
                            value={item.number_of_people}
                            onChange={(e) => setWinningVal(e, id, 'number_of_people')}
                            className="custom-form-control"
                            type="number"        
                            required
                        />
                    </FormGroup>
                </div>
                
                <FontAwesomeIcon className="remove-winning-icon" icon={faTrash} onClick={() => removeWinning(id)}/>      
            </Col>
        </Row>
    )
}

export default WinningItem;