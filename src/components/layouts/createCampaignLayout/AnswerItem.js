import React from 'react'
import { FormGroup, Input, Row, Col } from 'reactstrap'
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