import uuid from 'react-uuid'

export const pollActionsMap = (action) => {
  return {
    id: uuid(),
    pk: action.pk,
    question: action.question || '',
    response: action.responses || [""],
    multiples_choices: action.multiple_choices || false,
    entries: action.entries || '',
    mandatory: action.mandatory || false
  }
}