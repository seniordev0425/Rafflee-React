import uuid from 'react-uuid'

export const facebookActionsMap = (action) => {
  if (action.action_type === 'facebook_post') {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'post',
      post_entries: action.facebook_post_entries || '',
      post_mandatory: action.facebook_post_mandatory || false,
      post_like: false,
      post_comment: false,
      post_share: false,
      post_page_id: action.facebook_post_page_id || '',
      post_publication_id: action.facebook_post_publication_id || '',
    }
  } else if (action.action_type === 'facebook_url') {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'url',
      url_entries: action.facebook_url_entries || '',
      url_mandatory: action.facebook_url_mandatory || false,
      url_url: action.facebook_url_url || '',
      url_like: action.facebook_url_like || false,
      url_share: action.facebook_url_share || false,
    }
  } else {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'page',
      page_entries: action.facebook_page_entries || '',
      page_mandatory: action.facebook_page_mandatory || false,
      page_page_id: action.facebook_page_page_id || '',
      page_page_name: action.facebook_page_page_name || '',
      page_follow: action.facebook_page_follow || false,
      page_share: action.facebook_page_share || false
    }
  }
}