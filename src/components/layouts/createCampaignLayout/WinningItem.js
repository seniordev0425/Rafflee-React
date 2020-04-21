import React from 'react'
import { FormGroup, Input, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { required } from '../../../utils/validation'
import { useTranslation } from 'react-i18next'

function WinningItem(props) {
    const { t } = useTranslation()

    const { id, item, removeWinning, setWinningVal } = props
    return (
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
                <div className="mt-4 half-width">
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
            <Col xs="12" sm="4">
            <div className="footer-link-bold mb-3 mt-4">{t('create_campaign_page.number_of_people')}</div>
                <Row>
                    <Col xs="12" sm="4" className="p-0">
                        <div className="d-flex align-items-center">
                            <FormGroup>
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
                    </Col>
                    <Col xs="12" sm="8" className="d-flex justify-content-between align-items-center p-0 mb-3">
                        <div className="pl-0 pl-sm-2">
                            <Input
                                type='file'
                                onChange={(e) => setWinningVal(e, id, 'image')}
                            />
                        </div>
                        <FontAwesomeIcon className="remove-winning-icon" icon={faTrash} onClick={() => removeWinning(id)} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default WinningItem;