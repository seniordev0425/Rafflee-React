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