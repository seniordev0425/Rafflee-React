import React, { useState } from 'react'
import { FormGroup, Input, Row, Col, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ImageCropModal from '../../modals/ImageCropModal'
import { required } from '../../../utils/validation'
import { useTranslation } from 'react-i18next'

function WinningItem(props) {
    const { t } = useTranslation()

    const { id, item, removeWinning, setWinningVal } = props

    const [imgBase64Data, setImgBase64Data] = useState(item.image)

    const [openImageCropModal, setOpenImageCropModal] = useState(false)

    const handleImageCropModal = () => setOpenImageCropModal(!openImageCropModal)

    return (
        <Row>
            <Col xs="12" sm="4" md="3">
                <div className="mt-4">
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
            <Col xs="12" sm="4" md="3">
                <div className="mt-4">
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
            <Col xs="12" sm="4" md="2">
                <div className="mt-4">
                    <FormGroup>
                        <div className="footer-link-bold mb-3 mt-4">{t('create_campaign_page.number_of_people')}</div>
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
            <Col sm="12" md="4" className={imgBase64Data ? "mt-md-0" : "mt-md-4"}>
                <div className="d-flex justify-content-between align-items-center p-0 mb-md-0 mb-sm-3 mt-md-5">
                    <div className="pl-0 pl-sm-2 d-flex align-items-center">
                        <Input
                            type='file'
                            onChange={(e) => {
                                var file_read = new FileReader()
                                file_read.addEventListener('load', (event) => {
                                    var block = event.target.result.split(";")
                                    var realData = block[1].split(",")[1]
                                    setWinningVal(realData, id, 'image')
                                    setImgBase64Data(realData)
                                })
                                file_read.readAsDataURL(e.target.files[0])
                            }}
                        />
                        {imgBase64Data &&
                            <div>
                                <img src={`data:image/jpeg;base64,${imgBase64Data}`} style={{ width: 60, height: 60, borderRadius: 6 }} />
                                <Button
                                    onClick={handleImageCropModal}
                                    size="lg"
                                    color="primary"
                                    className="blue-btn mt-2"
                                    style={{ width: 60, height: 30, fontSize: '1rem', lineHeight: 1 }}
                                >
                                    {t('button_group.edit')}
                                </Button>
                            </div>
                        }

                    </div>
                    <FontAwesomeIcon className="remove-winning-icon" icon={faTrash} onClick={() => removeWinning(id)} />
                </div>
            </Col>
            <ImageCropModal
                open={openImageCropModal}
                onToggle={handleImageCropModal}
                setBase64Data={(value) => {
                    var block = value.split(";")
                    var realData = block[1].split(",")[1]
                    setImgBase64Data(realData)
                    setWinningVal(realData, id, 'image')
                }}
                src={`data:image/jpeg;base64,${imgBase64Data}`}
            />
        </Row>
    )
}

export default WinningItem;