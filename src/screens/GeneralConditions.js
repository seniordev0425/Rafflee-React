import React from 'react'
import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import PdfLayout from '../components/layouts/pdfLayout'


function GeneralConditions() {
    return (
        <div style={{ fontFamily: "sofiapro" }}>
            <JoinHeader />
            <Header />
            <PdfLayout name="general" />
            <FooterLink />
            <Footer />
        </div>
    )
}

export default GeneralConditions