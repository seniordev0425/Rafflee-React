import React from 'react'
import { mount } from 'enzyme'

import FormCheckbox from './index'


const props = {
  input: {
    name: 'testfield',
    value: false,
    onChange: e => e,
    onBlur: e => e,
  },
}

it('renders correct input element', () => {
  const wrapper = mount(<FormCheckbox {...props} />)

  expect(wrapper.find('input').prop('name')).toEqual(props.input.name)
  expect(wrapper.find('input').prop('value')).toEqual(props.input.value)
})

it('handles onchange event', () => {
  const localProps = {
    ...props,
  }
  localProps.input.onChange = jest.fn()
  localProps.input.onBlur = jest.fn()

  const wrapper = mount(<FormCheckbox {...localProps} />)

  wrapper.find('input').simulate('change', { target: { checked: true } })
  expect(localProps.input.onChange).toHaveBeenCalled()
  wrapper.find('input').simulate('blur')
  expect(localProps.input.onBlur).toHaveBeenCalled()
})
