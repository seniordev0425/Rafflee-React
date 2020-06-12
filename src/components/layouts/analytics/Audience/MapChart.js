import React from 'react'
import { GOOGLE_MAP_API_KEY } from '../../../../utils/constants'

const { compose, withProps, withStateHandlers } = require("recompose")
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} = require("react-google-maps")
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel")

const MapWithAMakredInfoWindow = compose(
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={1}
    defaultCenter={{ lat: 0, lng: 0 }}
  >
    {(props.demographics_type === 'action' ? props.overralActionDemographics : props.overralParitipationDemographics).map((item, index) =>
      <MarkerWithLabel
        key={index}
        position={{ lat: item.latitude, lng: item.longitude }}
        labelAnchor={new window.google.maps.Point(-15, 30)}
        labelStyle={{ fontSize: "14px", color: '#0091ff', fontWeight: 'bold' }}
        title={item.city}     
      >
        <span>{`${item.country} (${item.number})`}</span>
      </MarkerWithLabel>
    )}
  </GoogleMap>
)

function MapChart(props) {
  const { overralActionDemographics, overralParitipationDemographics, demographics_type } = props
  return (
    <MapWithAMakredInfoWindow
      overralActionDemographics={overralActionDemographics}
      overralParitipationDemographics={overralParitipationDemographics}
      demographics_type={demographics_type}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  )
}

export default MapChart