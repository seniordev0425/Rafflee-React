import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { Modal, ModalBody } from 'reactstrap'
import Cropper from 'react-easy-crop'
import { Slider, Button } from 'antd'

import { profilePictureUpdate } from '../../../actions/userInfo'
import { b64toBlob } from '../../../utils/others'

import getCroppedImg from './cropImage'
import { useTranslation } from 'react-i18next'

const ImageCropModal = (props) => {
  const { t } = useTranslation()
  
  const { 
    open, 
    onToggle, 
    onClose, 
    src, 
    setBase64Data 
  } = props

  const PROFILE_PICTURE_UPDATE_PROCESS = useSelector(state => state.userInfo.PROFILE_PICTURE_UPDATE)
  const PROFILE_PICTURE_UPDATE_SUCCESS = useSelector(state => state.userInfo.SUCCESS_PROFILE_PICTURE_UPDATE)
  const dispatch = useDispatch()

  const [tempImgData, setTempImgData] = useState('')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  useEffect(() => {
    if (PROFILE_PICTURE_UPDATE_SUCCESS) {
      setBase64Data(tempImgData)
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_PROFILE_PICTURE_UPDATE', data: false })
      onClose()
    }
  }, [PROFILE_PICTURE_UPDATE_SUCCESS])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    if (PROFILE_PICTURE_UPDATE_PROCESS) return

    try {
      const croppedImage = await getCroppedImg(
        src,
        croppedAreaPixels,
        rotation
      )
      setTempImgData(croppedImage)
      var formdata = new FormData()

      var blob = null
      if (croppedImage) {
        var block = croppedImage.split(";");
        var contentType = block[0].split(":")[1];
        var realData = block[1].split(",")[1];
        blob = b64toBlob(realData, contentType);
      }
      formdata.append("profile_picture", blob)
      dispatch(profilePictureUpdate(formdata))

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
                loading={PROFILE_PICTURE_UPDATE_PROCESS}
              >
                {!PROFILE_PICTURE_UPDATE_PROCESS && t('button_group.confirm')}
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ImageCropModal