import React from 'react'
import { mount } from 'enzyme'

import FormInput from './index'


const props = {
  input: {
    name: 'testfield',
    value: 'some value',
    onChange: e => e,
    onBlur: e => e,
  },
  meta: {
    touched: false,
    error: null,
  }
}

it('renders correct input element', () => {
  const wrapper = mount(<FormInput {...props} />)

  expect(wrapper.find('input').prop('name')).toEqual(props.input.name)
  expect(wrapper.find('input').prop('value')).toEqual(props.input.value)
})

it('handles onchange event', () => {
  const localProps = {
    ...props,
  }
  localProps.input.onChange = jest.fn()
  localProps.input.onBlur = jest.fn()

  const wrapper = mount(<FormInput {...localProps} />)

  wrapper.find('input').simulate('change', { target: { value: 'Test value' } })
  expect(localProps.input.onChange).toHaveBeenCalled()
  wrapper.find('input').simulate('blur')
  expect(localProps.input.onBlur).toHaveBeenCalled()
})

it('renders error if any', () => {
  const localProps = {
    ...props,
    meta: {
      touched: true,
      error: 'Validation error occurred!'
    }
  }
  const wrapper = mount(<FormInput {...localProps} />)

  expect(wrapper.text()).toContain(localProps.meta.error)
})
