import React from 'react'
import AppLayout from '../components/layouts/AppLayout'
import MyCircleLayout from '../components/layouts/myCircleLayout/MyCircleLayout'

function MyCircle() {
  return (
    <AppLayout>
      <div>
        <MyCircleLayout />
      </div>
    </AppLayout>
  )
}

export default MyCircle