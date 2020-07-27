import React from 'react'
import { withRouter } from 'react-router-dom'
import AppLayout from '../components/layouts/AppLayout'
import CurrentPromotionList from '../components/layouts/currentPromotionLayout/CurrentPromotionLIst'

function Deals() {
  return (
    <AppLayout>
      <CurrentPromotionList />
    </AppLayout>
  )
}

export default withRouter(Deals)
