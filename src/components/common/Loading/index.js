import React from 'react'
import { Spin } from 'antd'
import { Spinner } from 'reactstrap'

import './index.css'


export default () => (
  <div className="spinnerWrapper">
    <Spin size='large' />
  </div>
)
