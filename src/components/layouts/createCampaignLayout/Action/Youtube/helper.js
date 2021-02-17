import uuid from 'react-uuid'

export const youtubeActionsMap = (action) => {
  if (action.action_type === 'youtube_comment') {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'comment',
      comment_id: action.youtube_comment_id || '',
      comment_model: action.youtube_comment_model || '',
      comment_entries: action.youtube_comment_entries || '',
      comment_mandatory: action.youtube_comment_mandatory || false,
      comment_url_img: action.youtube_comment_url_img || '',
      comment_video_title: action.youtube_comment_video_title || '',
      comment_published_at: action.youtube_comment_published_at || '',
      comment_channel_title: action.youtube_comment_channel_title || '',
    }
  } else if (action.action_type === 'youtube_like') {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'like',
      like_id: action.youtube_like_id || '',
      like_entries: action.youtube_like_entries || '',
      like_mandatory: action.youtube_like_mandatory || false,
      like_url_img: action.youtube_like_url_img || '',
      like_video_title: action.youtube_like_video_title || '',
      like_published_at: action.youtube_like_published_at || '',
      like_channel_title: action.youtube_like_channel_title || '',
    }
  } else if (action.action_type === 'youtube_video') {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'video',
      video_id: action.youtube_video_id || '',
      video_url_img: action.youtube_video_url_img || '',
      video_entries: action.youtube_video_entries || '',
      video_published_at: action.youtube_video_published_at || '',
      video_mandatory: action.youtube_video_mandatory || ''
    }
  } else {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'follow',
      follow_id: action.youtube_follow_id || '',
      follow_entries: action.youtube_follow_entries || '',
      follow_mandatory: action.youtube_follow_mandatory || false,
      follow_url_img: action.youtube_follow_url_img || '',
      follow_channel_title: action.youtube_follow_channel_title || '',
    }
  }
}