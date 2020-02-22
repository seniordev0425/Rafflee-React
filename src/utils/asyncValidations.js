import { apiCall } from 'utils/apiCall'
import _set from 'lodash/set'


export const asyncValidate = (value, apiRoute) => value ? new Promise(resolve => apiCall(
  'get',
  apiRoute,
).then(({ data }) => {
  resolve(data.result)
}).catch(() => {
  return resolve(false)
})) : Promise.resolve(false)

export const asyncValidateEmail = value =>
  asyncValidate(value, `/user/email/${value}`)

export const asyncValidateSiteName = value =>
  asyncValidate(value, `/server/check/${value}.imfast.io`)

export const asyncValidatePhoneObj = value =>
  (value && value.phone_country && value.phone_number) ?
  asyncValidate(value, `/user/phone/${value.phone_country}-${value.phone_number}`) :
  Promise.resolve(false)

export const validateYupSchema = (schema) => async(values) => {
  if (typeof schema === 'function') {
    schema = schema()
  }

  try {
    await schema.validate(values, { abortEarly: false })
  } catch (e) {
    return e.inner.reduce((errors, error) => {
      _set(errors, error.path, error.message)
      return errors
    }, {})
  }
}
