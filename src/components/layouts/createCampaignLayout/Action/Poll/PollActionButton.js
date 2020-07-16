import React from 'react'

function PollActionButton(props) {
  return (
    <div
      {...props}
      className="poll-action-btn d-flex justify-content-between align-items-center mr-sm-4 mr-1 mb-sm-3 mb-1"
    >
      <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>?</div>
      <div>Poll</div>
    </div>
  )
}

export default PollActionButton