export const APIROUTE = process.env.REACT_APP_APIROUTE
export const IP_ADDRESS_API = process.env.REACT_APP_IP_ADDRESS_API
export const NUMBER_PER_PAGE = process.env.REACT_APP_NUMBER_PER_PAGE
export const UPLOAD_MAX_SIZE = process.env.REACT_APP_UPLOAD_MAX_SIZE
export const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
export const TWITCH_CLIENT_ID = process.env.REACT_APP_TWITCH_CLIENT_ID
export const INSTAGRAM_CLIENT_ID = process.env.REACT_APP_INSTAGRAM_CLIENT_ID

export const CONTACT_EMAIL = process.env.REACT_APP_CONTACT_EMAIL
export const GOOGLE_CAPTCHA_KEY = process.env.REACT_APP_GOOGLE_CAPTCHA_KEY

export const RAFFLEE_TWITTER_LINK = process.env.REACT_APP_RAFFLEE_TWITTER_LINK
export const RAFFLEE_FACEBOOK_LINK = process.env.REACT_APP_RAFFLEE_FACEBOOK_LINK
export const RAFFLEE_INSTAGRAM_LINK = process.env.REACT_APP_RAFFLEE_INSTAGRAM_LINK
export const RAFFLEE_LINKEDIN_LINK = process.env.REACT_APP_RAFFLEE_LINKEDIN_LINK
export const RAFFLEE_TIKTOK_LINK = process.env.REACT_APP_RAFFLEE_TIKTOK_LINK

export const LANGUAGE_NAME = {
  en: "english",
  fr: "french"
}

export const TWITCH_OAUTH_TOKEN_URL_FOR_COMPANY = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${TWITCH_CLIENT_ID}&redirect_uri=https://rafflee.io/twitch/connect/&scope=openid+viewing_activity_read+channel_read+user_follows_edit`
export const TWITCH_OAUTH_TOKEN_URL_FOR_USER = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${TWITCH_CLIENT_ID}&redirect_uri=https://rafflee.io/twitch/connect/&scope=openid+viewing_activity_read+user_follows_edit`
export const INSTAGRAM_OAUTH_TOKEN_URL = `https://www.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=https://rafflee.io/instagram/connect/&scope=user_profile,user_media&response_type=code`

export const PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.rafflee&gl=FR'
export const APP_STORE_LINK = 'https://apps.apple.com/fr/app/rafflee/id1514433128'