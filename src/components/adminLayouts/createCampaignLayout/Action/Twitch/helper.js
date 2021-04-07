import uuid from 'react-uuid'

export const twitchActionsMap = (action) => {
  return {
    id: uuid(),
    pk: action.pk,
    type: 'follow',
    follow_entries: action.twitch_follow_entries || '',
    follow_mandatory: action.twitch_follow_mandatory || false,
    follow_name: action.twitch_follow_name || ''
  }
}