import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Input } from 'reactstrap'
import ReactPlayer from 'react-player'

function VideoPlayerModal(props) {
    const { open, onToggle, videoEnded } = props

    const campaignData = useSelector(state => state.campaign.campaignData)
    const [playing, setPlaying] = useState(true)

    const handlePlayingState = (val) => {
        setPlaying(val)
    }

    useEffect(() => {
        window.addEventListener('blur', () => handlePlayingState(false))
        window.addEventListener('focus', () => handlePlayingState(true))


        return () => {
            window.removeEventListener('blur', handlePlayingState)
            window.removeEventListener('focus', handlePlayingState)
        }
    }, [])

    const handleEnded = () => {
        videoEnded()
    }
    return (
        <Modal isOpen={open} toggle={onToggle} size="lg">
            <ModalBody>
                <div className="promotion-list-item-title text-center mb-3">
                    {campaignData.action_participate[0] ? campaignData.action_participate[0].video_name : ''}
                </div>
                <ReactPlayer
                    controls
                    url={campaignData.action_participate[0] ? campaignData.action_participate[0].url_video : ''}
                    playing={playing}
                    width='100%'
                    height="100%"
                    onEnded={handleEnded}
                />
            </ModalBody>

        </Modal>
    )
}

export default VideoPlayerModal;