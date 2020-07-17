import React from 'react'

function ColorBar(props) {
  const { color, width } = props
  return (
    <div style={{ width: width, height: 10, background: color }}>
    </div>
  )
}

export default ColorBar;