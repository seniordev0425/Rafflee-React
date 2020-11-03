import React, { useState } from 'react'

import OffersPanel from './OffersPanel'
import OfferDetailPanel from './OfferDetailPanel'

const Offers = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentSection, setCurrentSection] = useState('offersPanel')
  const [selectedOffer, setSelectedOffer] = useState(null)

  const renderBody = () => {
    switch (currentSection) {
      case 'offersPanel':
        return (
          <OffersPanel
            onChangeSection={(section, offer) => {
              setCurrentSection(section)
              setSelectedOffer(offer)
            }}
            currentPage={currentPage}
            onChangePage={(value) => setCurrentPage(value)}
          />
        )
      case 'offerDetail':
        return (
          <OfferDetailPanel
            onChangeSection={(value) => setCurrentSection(value)}
            selectedOffer={selectedOffer}
          />
        )
      default:
        return <OffersPanel />
    }
  }

  return (
    <div>
      {renderBody()}
    </div>
  )
}

export default Offers