import React from 'react'
import uuid from 'react-uuid'
import { useTranslation } from 'react-i18next'
import images from '../../../../../utils/images'

function PollActionMenu(props) {
  const { t } = useTranslation()

  const { params, setParams } = props

  const addPollAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      question: '',
      response: [""],
      multiples_choices: false,
      entries: '',
      mandatory: false
    }
    setParams('poll', [...params.poll, newAction])
  }

  return (
    <div className="action-list-container">
      <div className="action-list-item">
        <label>{t('button_group.create_poll')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addPollAction}
          alt="plus"
        />
      </div>
    </div>
  )
}

export default PollActionMenu