import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { Map, Marker, Tooltip, TileLayer } from 'react-leaflet'

import { useTranslation } from 'react-i18next'

const { Option } = Select

function MapChart(props) {
  const { t } = useTranslation()

  const { overralDemographics } = props

  const [continent, setContinent] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')

  useEffect(() => {
    setContinent('')
    setCountry('')
    setCity('')
  }, [overralDemographics])

  const getCountryList = (continent) => {
    let country_arr = []
    overralDemographics.filter((item) => item.continent === continent).map((item) => country_arr.push(item.country))
    return country_arr
  }

  const getCityList = (country) => {
    let city_arr = []
    overralDemographics.filter((item) => item.country === country).map((item) => city_arr.push(item.city))
    return city_arr
  }

  return (
    <div>
      <Map center={[0, 0]} zoom={1}>
        <TileLayer
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {(overralDemographics).filter((item) => item.continent.includes(continent) && item.country.includes(country) && item.city.includes(city)).map((item, index) => (
          <Marker key={index} position={{ lat: item.latitude, lng: item.longitude }}>
            <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent>
              <span className="font-size-9 color-blue">{`${item.city}: ${item.number}`}</span>
              <div className="text-center color-red font-weight-bold">{item.country}</div>
            </Tooltip>
          </Marker>
        ))}
      </Map>
      <div className="d-block d-lg-flex mt-3">
        <div className="d-flex align-items-center mr-3 mt-3">
          <span className="font-size-11 font-weight-bold mr-2">{t('analytics_page.continent')}</span>
          <Select
            size="large"
            style={{ width: 140 }}
            value={continent}
            onChange={val => {
              setContinent(val)
              setCountry('')
              setCity('')
            }}
          >
            <Option value="">All</Option>
            <Option value="Asia">Asia</Option>
            <Option value="Europe">Europe</Option>
            <Option value="America">America</Option>
            <Option value="Africa">Africa</Option>
          </Select>
        </div>
        {continent !== '' &&
          <div className="d-flex align-items-center mr-3 mt-3">
            <span className="font-size-11 font-weight-bold mr-2">{t('analytics_page.country')}</span>
            <Select
              size="large"
              style={{ width: 140 }}
              value={country}
              onChange={val => {
                setCountry(val)
                setCity('')
              }}
            >
              <Option value="">All</Option>
              {getCountryList(continent).map((item, index) =>
                <Option key={index} value={item}>{item}</Option>
              )}
            </Select>
          </div>
        }
        {(continent !== '' && country !== '') &&
          <div className="d-flex align-items-center mr-3 mt-3">
            <span className="font-size-11 font-weight-bold mr-2">{t('analytics_page.city')}</span>
            <Select
              size="large"
              style={{ width: 140 }}
              value={city}
              onChange={val => setCity(val)}
            >
              <Option value="">All</Option>
              {getCityList(country).map((item, index) =>
                <Option key={index} value={item}>{item}</Option>
              )}
            </Select>
          </div>
        }
      </div>
    </div>
  )
}

export default MapChart