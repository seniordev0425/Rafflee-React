import uuid from 'react-uuid'

export const instagramActionsMap = (action) => {
  if (action.instagram_follow) {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'follow',
      follow_entries: action.instagram_follow_entries || '',
      follow_mandatory: action.instagram_follow_mandatory || false,
      follow_url: action.instagram_follow_url || '',
    }
  } else {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'like',
      like_entries: action.instagram_like_entries || '',
      like_mandatory: action.instagram_like_entries || false,
      like_url: action.instagram_like_url || ''
    }
  }
}