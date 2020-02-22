import React, { Component } from 'react'
import ReactTelInput from 'react-telephone-input/lib/withStyles'
import { FormFeedback } from 'reactstrap'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './index.css'


export default class FormPhoneInput extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object,
    hideValidationErrorText: PropTypes.bool,
    className: PropTypes.string,
  }

  handleChange = (phoneNumber, countryData) => {
    const { input } = this.props
    const cleanedPhoneNumber = phoneNumber.replace(`+${countryData.dialCode}`, '').replace(/[^0-9]/g, '')
    input.onChange({
      phone_country: countryData.dialCode,
      phone_number: cleanedPhoneNumber,
    })
  }

  render() {
    const { input, meta, hideValidationErrorText, className } = this.props
    const phoneNumberObj = input.value || ''
    let phoneNumber = `${phoneNumberObj.phone_country || ''} ${phoneNumberObj.phone_number || ''}`
    if (phoneNumber) {
      phoneNumber = '+' + phoneNumber
    }
    const hasValidationError = (meta && meta.touched && meta.error) || (meta.data && meta.data.error)
    const actualClassName = cx(className, {
      'border-danger': hasValidationError,
    })

    return <>
      <ReactTelInput
        inputProps={{
          className: actualClassName,
        }}
        defaultCountry='us'
        flagsImagePath='/images/flags.png'
        value={phoneNumber}
        onFocus={() => input.onFocus()}
        onChange={this.handleChange}
        onBlur={() => input.onBlur(input.value)}
      />

      {
        (!hideValidationErrorText && hasValidationError) &&
        <FormFeedback className="text-danger d-block">
          {meta.error || meta.data.error || meta.submitError}
        </FormFeedback>
      }
    </>
  }
}
