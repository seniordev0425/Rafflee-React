import React, { useState } from 'react'
import SlickSlider from 'react-slick'
import { useTranslation } from 'react-i18next'

const Slider = () => {
  const { t } = useTranslation()

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const settings = {
    beforeChange: (prev, next) => {
      setCurrentSlideIndex(next)
    },
    customPaging: (pagi, i) => {
      const style = {
        width: 15,
        height: 15,
        display: 'inline-block',
        borderRadius: 10,
        backgroundColor: '#0091ff73'
      };
      const activeStyle = {
        width: 15,
        height: 15,
        display: 'inline-block',
        borderRadius: 10,
        backgroundColor: '#0091ff'
      }
      return <span className="slick-dot" style={pagi === currentSlideIndex ? activeStyle : style} />
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "slick-dots custom-dots",
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <SlickSlider {...settings}>
      <div>
        <div className="font-weight-bold color-black font-size-14">
          {t('influencer_page.slider1.title')}
        </div>
        <div className="color-gray font-size-12 my-4">
          {t('influencer_page.slider1.text')}
        </div>
      </div>
      <div>
        <div className="font-weight-bold color-black font-size-14">
          {t('influencer_page.slider2.title')}
        </div>
        <div className="color-gray font-size-12 my-4">
          {t('influencer_page.slider2.text')}
        </div>
      </div>
      <div>
        <div className="font-weight-bold color-black font-size-14">
          {t('influencer_page.slider3.title')}
        </div>
        <div className="color-gray font-size-12 my-4">
          {t('influencer_page.slider3.text')}
        </div>
      </div>
      <div>
        <div className="font-weight-bold color-black font-size-14">
          {t('influencer_page.slider4.title')}
        </div>
        <div className="color-gray font-size-12 my-4">
          {t('influencer_page.slider4.text')}
        </div>
      </div>
    </SlickSlider>
  )
}

export default Slider