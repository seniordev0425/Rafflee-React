import uuid from 'react-uuid'

export const websiteActionsMap = (action) => {
  return {
    id: uuid(),
    pk: action.pk,
    entries: action.entries || '',
    mandatory: action.mandatory || false,
    url: action.url || ''
  }
}