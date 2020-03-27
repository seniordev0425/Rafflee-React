import React, { useState, useEffect } from 'react'
import FirstLayout from './FirstLayout'
import CreatePollLayout from './CreatePollLayout'
import FinalLayout from './FinalLayout'

function CreateCampaignLayout() {

    const [currentLayout, setCurrentLayout] = useState('first');
    const [pollCreated, setPollCreated] = useState(false)
    const [poll, setPoll] = useState(null)
    const [firstFormData, setFirstFormData] = useState(null)
    const [firstFormTempData, setFirstFormTempData] = useState({})


    useEffect(() => {
    })

    const gotoFirstLayout = (iscreated, poll) => {
        if (iscreated) {
            setPollCreated(true)
            setPoll(poll)
        }
        setCurrentLayout('first')
    }

    const gotoPollCreate = (data) => {
        setCurrentLayout('create poll')
        setFirstFormTempData(data)
    }

    const gotoFinalLayout = (result) => {
        console.log(result)
        setFirstFormData(result)
        setCurrentLayout('final')
    }

    const createNewPromotion = () => {
        setCurrentLayout('first')
        setFirstFormTempData({})
        setPollCreated(false)
    }
    const renderLayout = () => {
        switch (currentLayout) {
            case 'first':
                return <FirstLayout gotoPollCreate={gotoPollCreate} gotoFinalLayout={gotoFinalLayout} pollCreated={pollCreated} firstFormTempData={firstFormTempData} />
            case 'create poll':
                return <CreatePollLayout gotoFirstLayout={gotoFirstLayout} />
            case 'final':
                return <FinalLayout poll={poll} firstFormData={firstFormData} createNewPromotion={createNewPromotion} />

        }
    }
    return (
        <>
            {renderLayout()}
        </>
    )
}

export default CreateCampaignLayout;