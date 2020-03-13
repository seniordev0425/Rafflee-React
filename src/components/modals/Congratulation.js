import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap'
import images  from '../../utils/images'

function Congratulation(props) {
  const { open, onToggle, winnerArr } = props
  
  const renderWinners = () => {
    return(
      winnerArr.map((item, index) => 
        <div key={index} className="congratulation-item my-5">
          <div style={{position: "absolute", left: "6%", marginTop: -6, marginLeft: 23}}>
            <img src={'data:image/png;base64,' + item.picture_profile} alt="" width="35" height="35"/>
            <span className="ml-3">{item.username}</span>
          </div>
          <div className="d-flex align-items-center">
            {item.winning}
          </div>
          <div className="d-flex align-items-center">
            
          </div>
        </div>
      )
    )
  }
  return <Modal isOpen={open} toggle={onToggle} className="congratulation-modal">
            
            <ModalBody>
                <div className="congratulation-header">Congratulations!</div>
                <div className="congratulation-number">#000000001</div>
                {renderWinners()}
                <div className="d-flex justify-content-center">
                  <Button
                    color="primary"
                    className="blue-btn"
                    style={{width: 180}}
                    onClick={onToggle}
                  >
                  PICK ANOTHER
                  </Button>
                </div>
                <div className="d-flex justify-content-center my-5">
                  <span className="promotion-list-item-title mr-3" style={{fontSize: 17}}>Powered by: </span>
                  <img src={images.logo} width="70" height="22" alt="logo"/>
                </div>

            </ModalBody>
        </Modal>
}

Congratulation.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
}

export default Congratulation;
