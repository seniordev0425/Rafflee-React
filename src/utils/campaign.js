export const getTotalEntries = (campaignData) => {
  let totalTemp = 0
  if (campaignData.action_participate[0]?.social_action[0].facebook_page) {
    totalTemp += campaignData.action_participate[0].social_action[0].facebook_page_entries
  }
  if (campaignData.action_participate[0]?.social_action[0].facebook_post) {
    totalTemp += campaignData.action_participate[0].social_action[0].facebook_post_entries
  }
  if (campaignData.action_participate[0]?.social_action[0].facebook_url) {
    totalTemp += campaignData.action_participate[0].social_action[0].facebook_url_entries
  }

  if (campaignData.action_participate[0]?.social_action[1].youtube_like) {
    totalTemp += campaignData.action_participate[0].social_action[1].youtube_like_entries
  }
  if (campaignData.action_participate[0]?.social_action[1].youtube_follow) {
    totalTemp += campaignData.action_participate[0].social_action[1].youtube_follow_entries
  }
  if (campaignData.action_participate[0]?.social_action[1].youtube_comment) {
    totalTemp += campaignData.action_participate[0].social_action[1].youtube_comment_entries
  }
  if (campaignData.action_participate[0]?.social_action[1].youtube_video) {
    totalTemp += campaignData.action_participate[0].social_action[1].youtube_video_entries
  }

  if (campaignData.action_participate[0]?.social_action[2].instagram_profile) {
    totalTemp += campaignData.action_participate[0].social_action[2].instagram_profile_entries
  }
  if (campaignData.action_participate[0]?.social_action[2].instagram_publication) {
    totalTemp += campaignData.action_participate[0].social_action[2].instagram_publication_entries
  }

  if (campaignData.action_participate[0]?.social_action[3].twitter_like) {
    totalTemp += campaignData.action_participate[0].social_action[3].twitter_like_entries
  }
  if (campaignData.action_participate[0]?.social_action[3].twitter_follow) {
    totalTemp += campaignData.action_participate[0].social_action[3].twitter_follow_entries
  }
  if (campaignData.action_participate[0]?.social_action[3].twitter_tweet) {
    totalTemp += campaignData.action_participate[0].social_action[3].twitter_tweet_entries
  }
  if (campaignData.action_participate[0]?.social_action[3].twitter_retweet) {
    totalTemp += campaignData.action_participate[0].social_action[3].twitter_retweet_entries
  }
  if (campaignData.action_participate[0]?.social_action[3].twitter_comment_tweet) {
    totalTemp += campaignData.action_participate[0].social_action[3].twitter_comment_tweet_entries
  }

  if (campaignData.action_participate[0]?.social_action[4].twitch_follow) {
    totalTemp += campaignData.action_participate[0].social_action[4].twitch_follow_entries
  }

  if (campaignData.action_participate[0]?.social_action[5].tiktok_profile) {
    totalTemp += campaignData.action_participate[0].social_action[5].tiktok_profile_entries
  }
  if (campaignData.action_participate[0]?.social_action[5].tiktok_publication) {
    totalTemp += campaignData.action_participate[0].social_action[5].tiktok_publication_entries
  }

  if (campaignData.action_participate[0]?.video) {
    totalTemp += campaignData.action_participate[0].video.entries
  }

  if (campaignData.action_participate[0]?.website) {
    totalTemp += campaignData.action_participate[0].website.entries
  }

  if (campaignData.action_participate[0]?.poll) {
    totalTemp += campaignData.action_participate[0].poll.entries
  }

  return totalTemp
}

export const getTotalEntriesOfPreviewSection = (params) => {
  let totalTemp = 0
    if (params.facebook.page) {
      totalTemp += parseInt(params.facebook.page_entries) || 1
    }
    if (params.facebook.post) {
      totalTemp += parseInt(params.facebook.post_entries) || 1
    }
    if (params.facebook.url) {
      totalTemp += parseInt(params.facebook.url_entries) || 1
    }

    if (params.instagram.profile) {
      totalTemp += parseInt(params.instagram.profile_entries) || 1
    }
    if (params.instagram.publication) {
      totalTemp += parseInt(params.instagram.publication_entries) || 1
    }

    if (params.twitter.like) {
      totalTemp += parseInt(params.twitter.like_entries) || 1
    }
    if (params.twitter.follow) {
      totalTemp += parseInt(params.twitter.follow_entries) || 1
    }
    if (params.twitter.comment) {
      totalTemp += parseInt(params.twitter.comment_entries) || 1
    }
    if (params.twitter.retweet) {
      totalTemp += parseInt(params.twitter.retweet_entries) || 1
    }
    if (params.twitter.tweet) {
      totalTemp += parseInt(params.twitter.tweet_entries) || 1
    }

    if (params.youtube.like) {
      totalTemp += parseInt(params.youtube.like_entries) || 1
    }
    if (params.youtube.follow) {
      totalTemp += parseInt(params.youtube.follow_entries) || 1
    }
    if (params.youtube.comment) {
      totalTemp += parseInt(params.youtube.comment_entries) || 1
    }
    if (params.youtube.video) {
      totalTemp += parseInt(params.youtube.video_entries) || 1
    }

    if (params.twitch.follow) {
      totalTemp += parseInt(params.twitch.follow_entries) || 1
    }

    if (params.tiktok.profile) {
      totalTemp += parseInt(params.tiktok.profile_entries) || 1
    }
    if (params.tiktok.publication) {
      totalTemp += parseInt(params.tiktok.publication_entries) || 1
    }

    if (params.url_video.video) {
      totalTemp += parseInt(params.url_video.entries) || 1
    }

    if (params.url_website.website) {
      totalTemp += parseInt(params.url_website.entries) || 1
    }

    if (params.poll !== 'false') {
      totalTemp += parseInt(params.poll.entries) || 1
    }

    return totalTemp
}