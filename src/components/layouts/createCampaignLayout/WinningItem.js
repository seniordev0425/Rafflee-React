import React, {useState} from 'react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import {Form as FinalForm, Field} from 'react-final-form'
import PropTypes from 'prop-types'
import {Form, FormGroup, Button, Input, Row, Col} from 'reactstrap'

import FormInput from '../../common/FormInput'
import FormPhoneInput from '../../common/FormPhoneInput'
import CheckBoxButtonWithString from '../../common/Buttons/CheckBoxButtonWithString'
import images from '../../../utils/images'
import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength,
    requiredPhoneObj
} from '../../../utils/validation'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function WinningItem(props){

    const {id, item, removeWinning, setWinningVal} = props
    return(
        <Row>
            <Col xs="12" sm="4">
                <div className="mt-4 half-width">
                    <FormGroup>
                        <div className="footer-link-bold mb-3">Name of Prizes</div>
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
                        <div className="footer-link-bold mb-3">Type of Prizes</div>
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
            <Col xs="12" sm="4" style={{display: "flex", justifyContent: "space-between"}}>
                <div className="mt-4 half-width">
                    <FormGroup>
                        <div className="footer-link-bold mb-3">Number of People</div>
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