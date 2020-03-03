import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Form as FinalForm, Field} from 'react-final-form'
import {Form, FormGroup, Button, Input, Modal, ModalHeader, ModalBody} from 'reactstrap'
import FormInput from '../common/FormInput'

function Congratulation(props) {
  const { open, onToggle } = props
  
  return <Modal isOpen={open} toggle={onToggle} className="congratulation-modal">
            <ModalHeader toggle={onToggle}>Congratulation</ModalHeader>
            <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
        </Modal>
}

Congratulation.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
}

export default Congratulation;
