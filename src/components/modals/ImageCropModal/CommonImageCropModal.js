import React, { useState, useCallback } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import Cropper from 'react-easy-crop'
import { Slider, Button } from 'antd'
import getCroppedImg from './cropImage'
import { useTranslation } from 'react-i18next'

const ImageCropModal = (props) => {
  const { t } = useTranslation()

  const { 
    open, 
    onToggle, 
    src, 
    setBase64Data 
  } = props
  
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        src,
        croppedAreaPixels,
        rotation
      )
      setBase64Data(croppedImage)
      onToggle()
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  return (
    <Modal isOpen={open} toggle={onToggle}>
      <ModalBody>
        <div>
          <div className="cropContainer">
            <Cropper
              image={src}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              style={{ containerStyle: { position: 'relative', width: '100%', height: '100%' } }}
            />
          </div>
          <div className="mt-3">
            <span className="font-size-11">Zoom</span>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={value => setZoom(value)}
            />
            <span className="font-size-11">Rotation</span>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              onChange={value => setRotation(value)}
            />
            <span className="font-size-11">Aspect</span>
            <Slider
              value={aspect}
              min={0}
              max={3}
              step={0.1}
              onChange={value => setAspect(value)}
            />
            <div className="d-flex justify-content-center">
              <Button
                onClick={showCroppedImage}
                type="primary"
                className="ant-blue-btn mt-2"
                style={{ width: 200 }}
              >
                {t('button_group.confirm')}
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ImageCropModal