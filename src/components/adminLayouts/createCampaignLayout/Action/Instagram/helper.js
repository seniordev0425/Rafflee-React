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
  } else if (action.instagram_comment) {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'comment',
      comment_entries: action.instagram_comment_entries || '',
      comment_mandatory: action.instagram_comment_mandatory || false,
      comment_url: action.instagram_comment_image_url || '',
      comment_id: action.instagram_publication_id || '',
      comment_caption: action.instagram_comment_caption || '',
      comment_like_count: action.instagram_comment_like_count || '',
      comment_created_at: action.instagram_comment_timestamp || '',
      comment_media_type: action.instagram_comment_media_type || '',
      comment_permalink: action.instagram_comment_publication_url || ''
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