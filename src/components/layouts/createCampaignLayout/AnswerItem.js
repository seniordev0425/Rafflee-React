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

function AnswerItem(props){

    const {id, item, removeAnswer, setAnswerVal} = props
    return(
        <Row>
            <Col xs="12" className="pl-0 pr-0" style={{display: "flex", justifyContent: "space-between"}}>
                <div className="mt-4" style={{width: "85%"}}>
                    <FormGroup>
                    <Input
                            name={"answer" + id}
                            value={item}
                            onChange={(e) => setAnswerVal(e, id)}
                            className="custom-form-control"
                            type="text"   
                            required
                        />
                    </FormGroup>
                </div>
                
                <FontAwesomeIcon className="remove-answer-icon" icon={faTrash} onClick={() => removeAnswer(id)}/>      
            </Col>
        </Row>
    )
}

export default AnswerItem;