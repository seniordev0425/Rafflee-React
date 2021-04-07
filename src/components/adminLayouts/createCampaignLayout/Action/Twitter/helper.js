import uuid from 'react-uuid'

export const twitterActionsMap = (action) => {
  if (action.twitter_comment_tweet) {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'comment',
      comment_id: action.twitter_comment_tweet_id || '',
      comment_model: action.twitter_comment_tweet_model || '',
      comment_entries: action.twitter_comment_tweet_entries || '',
      comment_mandatory: action.twitter_comment_tweet_mandatory || false,
      comment_text: action.twitter_comment_tweet_text || '',
      comment_like: action.twitter_comment_tweet_like || 0,
      comment_retweet: action.twitter_comment_tweet_retweet || 0,
      comment_created_at: action.twitter_comment_tweet_created_at || '',
      comment_name: action.twitter_comment_tweet_name || '',
      comment_verified: action.twitter_comment_tweet_verified || false,
      comment_profile_img: action.twitter_comment_tweet_profile_img || ''
    }
  } else if (action.twitter_like) {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'like',
      like_id: action.twitter_like_id || '',
      like_entries: action.twitter_like_entries || '',
      like_mandatory: action.twitter_like_mandatory || false,
      like_text: action.twitter_like_text || '',
      like_like: action.twitter_like_like || 0,
      like_retweet: action.twitter_like_retweet || 0,
      like_created_at: action.twitter_like_created_at || '',
      like_name: action.twitter_like_name || '',
      like_verified: action.twitter_like_verified || false,
      like_profile_img: action.twitter_like_profile_img || '',
    }
  } else if (action.twitter_tweet) {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'tweet',
      tweet_model: action.twitter_tweet_model || '',
      tweet_entries: action.twitter_tweet_entries || '',
      tweet_mandatory: action.twitter_tweet_mandatory || false,
    }
  } else if (action.twitter_retweet) {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'retweet',
      retweet_id: action.twitter_retweet_id || '',
      retweet_entries: action.twitter_retweet_entries || '',
      retweet_mandatory: action.twitter_retweet_mandatory || false,
      retweet_text: action.twitter_retweet_text || '',
      retweet_like: action.twitter_retweet_like || 0,
      retweet_retweet: action.twitter_retweet_retweet || 0,
      retweet_created_at: action.twitter_retweet_created_at || '',
      retweet_name: action.twitter_retweet_name || '',
      retweet_verified: action.twitter_retweet_verified || false,
      retweet_profile_img: action.twitter_retweet_profile_img || '',
    }
  } else {
    return {
      id: uuid(),
      pk: action.pk,
      type: 'follow',
      follow_id: action.twitter_follow_id || '',
      follow_entries: action.twitter_follow_entries || '',
      follow_mandatory: action.twitter_follow_mandatory || false,
      follow_profile_image_url: action.twitter_follow_url_img || '',
      follow_followers_count: action.twitter_follow_followers_count || '',
      follow_screen_name: action.twitter_follow_screen_name || '',
      follow_verified: action.twitter_follow_verified || false,
    }
  }
}