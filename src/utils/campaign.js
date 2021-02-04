import { isEmpty, find } from 'lodash'

export const getTotalEntries = (params) => {
  let totalTemp = 0
  if (isEmpty(params)) return totalTemp

  params.facebook.forEach(action => {
    if (action.action_type === 'page') {
      totalTemp += parseInt(action.facebook_page_entries) || 1
    }
    if (action.action_type === 'post') {
      totalTemp += parseInt(action.facebook_post_entries) || 1
    }
    if (action.action_type === 'url') {
      totalTemp += parseInt(action.facebook_url_entries) || 1
    }
  })

  params.instagram.forEach(action => {
    if (action.instagram_like) {
      totalTemp += parseInt(action.instagram_like_entries) || 1
    }
    if (action.instagram_follow) {
      totalTemp += parseInt(action.instagram_follow_entries) || 1
    }
    if (action.instagram_comment) {
      totalTemp += parseInt(action.instagram_comment_entries) || 1
    }
  })

  params.twitter.forEach(action => {
    if (action.twitter_like) {
      totalTemp += parseInt(action.twitter_like_entries) || 1
    }
    if (action.twitter_follow) {
      totalTemp += parseInt(action.twitter_follow_entries) || 1
    }
    if (action.twitter_comment_tweet) {
      totalTemp += parseInt(action.twitter_comment_tweet_entries) || 1
    }
    if (action.twitter_retweet) {
      totalTemp += parseInt(action.twitter_retweet_entries) || 1
    }
    if (action.twitter_tweet) {
      totalTemp += parseInt(action.twitter_tweet_entries) || 1
    }
  })

  params.youtube.forEach(action => {
    if (action.action_type === 'youtube_like') {
      totalTemp += parseInt(action.youtube_like_entries) || 1
    }
    if (action.action_type === 'youtube_follow') {
      totalTemp += parseInt(action.youtube_follow_entries) || 1
    }
    if (action.action_type === 'youtube_comment') {
      totalTemp += parseInt(action.youtube_comment_entries) || 1
    }
    if (action.action_type === 'youtube_video') {
      totalTemp += parseInt(action.youtube_video_entries) || 1
    }
  })

  params.twitch.forEach(action => {
    totalTemp += parseInt(action.twitch_follow_entries) || 1
  })

  params.tiktok.forEach(action => {
    if (action.tiktok_like) {
      totalTemp += parseInt(action.tiktok_like_entries) || 1
    }
    if (action.tiktok_follow) {
      totalTemp += parseInt(action.tiktok_follow_entries) || 1
    }
  })

  params.website.forEach(action => {
    totalTemp += parseInt(action.entries) || 1
  })

  params.poll.forEach(action => {
    totalTemp += parseInt(action.entries) || 1
  })

  return totalTemp
}

export const getTotalEntriesOfPreviewSection = (params) => {
  let totalTemp = 0
  params.facebook.forEach(action => {
    if (action.type === 'page') {
      totalTemp += parseInt(action.page_entries) || 1
    }
    if (action.type === 'post') {
      totalTemp += parseInt(action.post_entries) || 1
    }
    if (action.type === 'url') {
      totalTemp += parseInt(action.url_entries) || 1
    }
  })

  params.instagram.forEach(action => {
    if (action.type === 'like') {
      totalTemp += parseInt(action.like_entries) || 1
    }
    if (action.type === 'follow') {
      totalTemp += parseInt(action.follow_entries) || 1
    }
    if (action.type === 'comment') {
      totalTemp += parseInt(action.comment_entries) || 1
    }
  })

  params.twitter.forEach(action => {
    if (action.type === 'like') {
      totalTemp += parseInt(action.like_entries) || 1
    }
    if (action.type === 'follow') {
      totalTemp += parseInt(action.follow_entries) || 1
    }
    if (action.type === 'comment') {
      totalTemp += parseInt(action.comment_entries) || 1
    }
    if (action.type === 'retweet') {
      totalTemp += parseInt(action.retweet_entries) || 1
    }
    if (action.type === 'tweet') {
      totalTemp += parseInt(action.tweet_entries) || 1
    }
  })

  params.youtube.forEach(action => {
    if (action.type === 'like') {
      totalTemp += parseInt(action.like_entries) || 1
    }
    if (action.type === 'follow') {
      totalTemp += parseInt(action.follow_entries) || 1
    }
    if (action.type === 'comment') {
      totalTemp += parseInt(action.comment_entries) || 1
    }
    if (action.type === 'video') {
      totalTemp += parseInt(action.video_entries) || 1
    }
  })

  params.twitch.forEach(action => {
    if (action.type === 'follow') {
      totalTemp += parseInt(action.follow_entries) || 1
    }
  })

  params.tiktok.forEach(action => {
    if (action.type === 'like') {
      totalTemp += parseInt(action.like_entries) || 1
    }
    if (action.type === 'follow') {
      totalTemp += parseInt(action.follow_entries) || 1
    }
  })

  params.url_website.forEach(action => {
    totalTemp += parseInt(action.entries) || 1
  })

  params.poll.forEach(action => {
    totalTemp += parseInt(action.entries) || 1
  })

  return totalTemp
}

export const getSocialUserActions = (userActions, socialName, pk, actionType) => {
  if (!userActions) return false
  let userAction = find(userActions[socialName], { pk: pk })
  if (userAction) {
    return userAction[actionType]
  }
  return false
}