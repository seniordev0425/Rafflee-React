import React from 'react'
import { mount } from 'enzyme'

import FormSelect from './index'


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
  },
  data: [
    { key: 1, value: 'Item 1' },
    { key: 2, value: 'Item 2' },
  ]
}

it('renders correct input element', () => {
  const wrapper = mount(<FormSelect {...props} />)

  expect(wrapper.find('select').prop('name')).toEqual(props.input.name)
  expect(wrapper.find('select').prop('value')).toEqual(props.input.value)
  expect(wrapper.find('option').length).toEqual(props.data.length + 1)
})

it('handles onchange event', () => {
  const localProps = {
    ...props,
  }
  localProps.input.onChange = jest.fn()
  localProps.input.onBlur = jest.fn()

  const wrapper = mount(<FormSelect {...localProps} />)

  wrapper.find('select').simulate('change', { target: { value: 'Test value' } })
  expect(localProps.input.onChange).toHaveBeenCalled()
  wrapper.find('select').simulate('blur')
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
  const wrapper = mount(<FormSelect {...localProps} />)

  expect(wrapper.text()).toContain(localProps.meta.error)
})
