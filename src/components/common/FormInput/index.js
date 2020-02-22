import React from 'react'
import { FormFeedback, Input } from 'reactstrap'
import PropTypes from 'prop-types'
import cx from 'classnames'


function FormInput({ input, meta, type, hideValidationErrorText, inline, className, needsFeedback, ...restProps }) {
  const hasValidationError = Boolean(
    (meta && meta.touched && meta.error) ||
    (meta.data && meta.data.error) ||
    meta.submitError
  )
  const borderColorFilteredClassname = hideValidationErrorText && hasValidationError ?
    className.replace(/border-[a-z0-9-]+ ?/g, '') : className
  const actualClassName = cx(borderColorFilteredClassname, {
    'border-danger': hideValidationErrorText && hasValidationError,
  })

  const inputControlContent = <>
    <Input
      className={actualClassName}
      {...restProps}
      invalid={hasValidationError}
      valid={needsFeedback && meta.touched && meta.valid ? true : undefined}
      {...(Object.assign({}, input, { type: input.type || 'text' }))}
    />

    {
      (!hideValidationErrorText && hasValidationError) &&
      <FormFeedback className="text-left">
        {meta.error || (meta.data && meta.data.error) || meta.submitError}
      </FormFeedback>
    }
  </>

  if (inline) {
    return inputControlContent
  }

  return <span className="d-block w-100">
    {inputControlContent}
  </span>
}

FormInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  type: PropTypes.string,
  hideValidationErrorText: PropTypes.bool,
  className: PropTypes.string,
}

export default FormInput
