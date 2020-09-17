import React, { useState } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import LoginSignupBaseModal from '../modals/LoginSignupBaseModal'

const CustomCollapsePanelForFAQ = (props) => {
  const { title, text, textLink, redirectTo } = props

  const [companyStatus, setCompanyStatus] = useState(redirectTo !== 'user')
  const [isLogin, setIsLogin] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const switch_login_signin = (val) => {
    // Switch login, sign up modals depends on 'isLogin' state
    setIsLogin(val)
  }

  return (
    <ExpansionPanel className="faq-collapse-panel-body">
      <ExpansionPanelSummary

        className="collapse-panel-summary"
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        aria-label="Expand"
        id="panel1a-header"
      >
        <span className="promotion-list-item-title">{title}</span>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <div>
          <div className="color-gray font-size-11">
            {textLink &&
              <span
                onClick={() => setOpenModal(!openModal)}
                className="font-weight-bold pointer color-blue"
              >
                {textLink}
              </span>
            }
            <span style={{ whiteSpace: 'pre-line' }}>{text}</span>
          </div>
        </div>
      </ExpansionPanelDetails>
      <LoginSignupBaseModal
        modal={openModal}
        isLogin={isLogin}
        switch_login_signin={switch_login_signin}
        toggle={() => {
          redirectTo === 'user' && setCompanyStatus(false)
          setOpenModal(!openModal)
        }}
        companyStatus={companyStatus}
        showCompanyModal={() => setCompanyStatus(true)}
      />
    </ExpansionPanel>
  )
}

export default CustomCollapsePanelForFAQ