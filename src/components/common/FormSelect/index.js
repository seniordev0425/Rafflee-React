import React from 'react'
import { Input } from 'reactstrap'
import PropTypes from 'prop-types'
import cx from 'classnames'


function FormSelect({
  input, meta,
  data, keyField, valueField, useDefaultOption, defaultOptionValue, defaultOptionText,
  hideValidationErrorText, className,
}) {
  const _keyField = keyField || 'key'
  const _valueField = valueField || 'value'
  const actualClassName = cx(className, {
    'border-danger': hideValidationErrorText && meta && meta.touched && meta.error,
  })

  return <span className="d-block">
    <Input
      {...input}
      className={actualClassName}
      type="select"
    >
      {
        (
          useDefaultOption ||
          typeof useDefaultOption === 'undefined'
        ) && <option value={defaultOptionValue || ''}>
          {defaultOptionText || '-- Choose one --'}
        </option>
      }
      {
        data.map(record => (
          <option
            key={record[_keyField]}
            value={record[_keyField]}
          >
            {record[_valueField]}
          </option>
        ))
      }
    </Input>

    {
      (!hideValidationErrorText && meta && meta.touched && meta.error) &&
      <span className="text-danger">{meta.error}</span>
    }
  </span>
}

FormSelect.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  hideValidationErrorText: PropTypes.bool,
  className: PropTypes.string,
}

export default FormSelect
