import React, { useState } from 'react'

import RequestsPanel from './RequestsPanel'
import RequestDetailPanel from './RequestDetailPanel'

const Requests = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentSection, setCurrentSection] = useState('requestsPanel')
  const [selectedRequest, setSelectedRequest] = useState(null)

  const renderBody = () => {
    switch (currentSection) {
      case 'requestsPanel':
        return (
          <RequestsPanel
            onChangeSection={(section, request) => {
              setCurrentSection(section)
              setSelectedRequest(request)
            }}
            currentPage={currentPage}
            onChangeCurrentPage={(value) => setCurrentPage(value)}
          />
        )
      case 'requestDetail':
        return (
          <RequestDetailPanel
            onChangeSection={(value) => setCurrentSection(value)}
            selectedRequest={selectedRequest}
          />
        )
      default:
        return <RequestsPanel />
    }
  }

  return (
    <div>
      {renderBody()}
    </div>
  )
}

export default Requests