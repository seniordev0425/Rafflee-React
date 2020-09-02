import React from 'react'
import { Spin } from 'antd'
import AppLayout from '../../layouts/AppLayout'

const LoadingPage = () => {
  return (
    <AppLayout>
      <div className="font-size-16 color-blue font-weight-bold d-flex justify-content-center align-items-center max-height-container">
        <span>
          <Spin size='large' />
        </span>
      </div>
    </AppLayout>
  )
}

export default LoadingPage