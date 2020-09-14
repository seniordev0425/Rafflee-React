import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AppLayout from '../components/layouts/AppLayout'
import HomeHelmet from '../components/common/Helmets/HomeHelmet'
import Banner from '../components/layouts/Banner'
import Carousel from '../components/layouts/hotPromotionLayout/Carousel'
import CurrentPromotionList from '../components/layouts/currentPromotionLayout/CurrentPromotionLIst'
import { getHotPromotions, getHighlightedPromotions } from '../actions/homepage'
import Loading from '../components/common/Loading'

import { useTranslation } from 'react-i18next'


function Home() {
  const { t } = useTranslation()

  const hotPromotions = useSelector(state => state.homepage.hotPromotions)
  const GET_HOT_PROMOTIONS_PROCESS = useSelector(state => state.userInfo.GET_HOT_PROMOTIONS)

  const token = useSelector(state => state.userInfo.token)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHotPromotions({ token: token }))
    dispatch(getHighlightedPromotions({ token: token }))
  }, [])

  return (
    <AppLayout>
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
          (<Carousel hotPromotions={hotPromotions} />)
        }
        <CurrentPromotionList />
      </div>
    </AppLayout>
  )
}

export default withRouter(Home)
