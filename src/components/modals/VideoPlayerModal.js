import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, Input } from 'reactstrap'
import ReactPlayer from 'react-player'

function VideoPlayerModal(props) {
    const { open, onToggle } = props

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
        console.log('Playing ended!')
    }
    return (
        <Modal isOpen={open} toggle={onToggle} size="lg">
            <ModalBody>
                <ReactPlayer
                    controls
                    url='https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
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