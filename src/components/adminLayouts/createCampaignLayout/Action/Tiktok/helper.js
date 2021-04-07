import uuid from 'react-uuid'

export const tiktokActionsMap = (action) => {
  if (action.tiktok_follow) {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'follow',
      follow_entries: action.tiktok_follow_entries || '',
      follow_mandatory: action.tiktok_follow_mandatory || false,
      follow_url: action.tiktok_follow_url || '',
    }
  } else {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'like',
      like_entries: action.tiktok_like_entries || '',
      like_mandatory: action.tiktok_like_mandatory || false,
      like_url: action.tiktok_like_url || '',
    }
  }
}