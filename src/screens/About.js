import React from 'react'
import { withRouter } from 'react-router-dom'
import AppLayout from '../components/layouts/AppLayout'
import AboutHelmet from '../components/common/Helmets/AboutHelmet'

function Deals() {
  return (
    <AppLayout>
      <AboutHelmet />
    </AppLayout>
  )
}

export default withRouter(Deals)
