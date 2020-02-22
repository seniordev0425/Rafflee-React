import React from 'react'
import { mount } from 'enzyme'

import { changeInputValue } from 'utils/testTools'
import FormPhoneInput from './index'


const props = {
  input: {
    value: {
      phone_country: '1',
      phone_number: '2025550176',
    },
    onChange: e => e,
    onBlur: e => e,
  },
  meta: {},
}

it('renders initial values', () => {
  const wrapper = mount(<FormPhoneInput {...props} />)

  expect(wrapper.find('input').prop('value')).toEqual('+1 (202) 555-0176')
})

it('reacts to country and number change', () => {
  const localProps = {
    ...props,
    input: {
      ...props.input,
      value: null,
      onChange: jest.fn(),
    }
  }

  const wrapper = mount(<FormPhoneInput {...localProps} />)

  wrapper.find('button').simulate('click')
  wrapper.find({
    'data-country-code': 'gb',
  }).simulate('click')

  expect(localProps.input.onChange).toHaveBeenCalledWith({
    phone_country: '44',
    phone_number: '',
  })

  localProps.input.onChange.mockClear()
  changeInputValue(wrapper.find('input'), '01632960315')

  expect(localProps.input.onChange).toHaveBeenCalledWith({
    phone_country: '44',
    phone_number: '01632960315',
  })
})
