import React, { useState } from 'react'

import MessagesPanel from './MessagesPanel'
import MessageDetailPanel from './MessageDetailPanel'

const Messages = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentSection, setCurrentSection] = useState('messagesPanel')
  const [selectedMessage, setSelectedMessage] = useState(null)

  const renderBody = () => {
    switch (currentSection) {
      case 'messagesPanel':
        return (
          <MessagesPanel
            onChangeSection={(section, message) => {
              setCurrentSection(section)
              setSelectedMessage(message)
            }}
            currentPage={currentPage}
            onChangeCurrentPage={(value) => setCurrentPage(value)}
          />
        )
      case 'messageDetailPanel':
        return ( 
          <MessageDetailPanel
            onChangeSection={(value) => setCurrentSection(value)}
            selectedMessage={selectedMessage}
          />
        )
      default:
        return <MessagesPanel />
    }
  }

  return (
    <div>
      {renderBody()}
    </div>
  )
}

export default Messages