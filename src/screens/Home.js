import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'


import AppLayout from '../components/layouts/AppLayout'
import HomeHelmet from '../components/common/Helmets/HomeHelmet'
import Banner from '../components/layouts/Banner'
import LowerBanner from '../components/layouts/LowerBanner'
import Carousel from '../components/layouts/hotPromotionLayout/Carousel'
import CurrentPromotionList from '../components/layouts/currentPromotionLayout/CurrentPromotionLIst'
import Loading from '../components/common/Loading'

import { getHotPromotions } from '../actions/homepage'
import { useTranslation } from 'react-i18next'


function Home(props) {
  const { t } = useTranslation()

  const openLoginModal = props.location?.state?.openLoginModal || false

  const hotPromotions = useSelector(state => state.homepage.hotPromotions)
  const GET_HOT_PROMOTIONS_PROCESS = useSelector(state => state.userInfo.GET_HOT_PROMOTIONS)

  const token = useSelector(state => state.userInfo.token)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHotPromotions({ token: token }))
  }, [])

  return (
    <AppLayout openLoginModal={openLoginModal}>
      <HomeHelmet />
      <div>
        <Banner />
        <div className="hot-new-text banner-text">
          {t('homepage.hot_new_contest_everyday')}
        </div>
        <div className="premium-prize-text">
          {t('homepage.premium_prizes_giveaways')}
        </div>
        {GET_HOT_PROMOTIONS_PROCESS
          ?
          <Loading />
          :
          <Carousel hotPromotions={hotPromotions} />
        }
        <div className="d-flex justify-content-center mb-5">
          <LowerBanner />
        </div>
        <CurrentPromotionList />
      </div>
    </AppLayout>
  )
}

export default withRouter(Home)
