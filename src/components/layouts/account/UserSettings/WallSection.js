import React, { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Button, Checkbox, Select } from 'antd'
import Loading from '../../../common/Loading'
import { getWallSetting, updateWallSetting } from '../../../../actions/userInfo'
import { getFacebookPages } from '../../../../actions/social'

import { useTranslation } from 'react-i18next'

const { Option } = Select

function WallSection() {
  const { t } = useTranslation()

  const company = useSelector(state => state.userInfo.company)
  const userInfo = useSelector(state => company ? state.userInfo.companyProfile : state.userInfo.userProfile)
  const wallSetting = useSelector(state => state.userInfo.wallSetting)
  const facebookPages = useSelector(state => state.social.facebookPages)
  const GET_WALL_SETTING_PROCESS = useSelector(state => state.userInfo.GET_WALL_SETTING)
  const GET_FACEBOOK_PAGES_PROCESS = useSelector(state => state.userInfo.GET_FACEBOOK_PAGES)
  const UPDATE_WALL_SETTING_PROCESS = useSelector(state => state.userInfo.UPDATE_WALL_SETTING)
  const dispatch = useDispatch()


  const [twitter, setTwitter] = useState(wallSetting.twitter)
  const [instagram, setInstagram] = useState(wallSetting.instagram)
  const [facebook, setFacebook] = useState((wallSetting.facebook || {}).activate || false)
  const [fbPageId, setFbPageId] = useState((wallSetting.facebook || {}).id || '')

  useEffect(() => {
    dispatch(getWallSetting())
    dispatch(getFacebookPages())
  }, [])

  useMemo(() => {
    ///////////////////////////////////////////// Initialize wall settings
    setTwitter(wallSetting.twitter)
    setInstagram(wallSetting.instagram)
    setFacebook((wallSetting.facebook || {}).activate || false)
    setFbPageId((wallSetting.facebook || {}).id || '')
  }, [wallSetting])

  const updateSetting = () => {
    let facebook_para = {
      id: fbPageId,
      activate: facebook
    }
    var body = {
      twitter: twitter,
      instagram: instagram,
      facebook: JSON.stringify(facebook_para)
    }
    dispatch(updateWallSetting(body))
  }

  if (GET_WALL_SETTING_PROCESS || GET_FACEBOOK_PAGES_PROCESS) return <div className="min-height-container"><Loading /></div>

  return (
    <div className="reset-password-form min-height-container">
      {userInfo.twitter &&
        <div>
          <Checkbox
            checked={twitter}
            onChange={() => setTwitter(!twitter)}
          />
          <span className="footer-link-bold ml-3">{t('user_settings_page.show_twitter')}</span>
        </div>
      }
      {(userInfo.instagram || userInfo.instagram_business) &&
        <div className="mt-3">
          <Checkbox
            checked={instagram}
            onChange={() => setInstagram(!instagram)}
          />
          <span className="footer-link-bold ml-3">{t('user_settings_page.show_instagram')}</span>
        </div>
      }
      {userInfo.facebook &&
        <div>
          <div className="mt-3">
            <Checkbox
              checked={facebook}
              onChange={() => setFacebook(!facebook)}
            />
            <span className="footer-link-bold ml-3">{t('user_settings_page.show_facebook')}</span>
          </div>
          {facebook &&
            <div className="mt-3">
              <Select
                defaultValue={fbPageId}
                className="w-100"
                placeholder={t('create_campaign_page.select_page')}
                onChange={(id) => setFbPageId(id)}
                size="large"
              >
                {facebookPages.map((page, id) => (
                  <Option key={id} value={page.id}>
                    {page.name}
                  </Option>
                ))}
              </Select>
            </div>
          }
        </div>
      }
      <Button
        onClick={updateSetting}
        type="primary"
        className="ant-blue-btn mt-4"
        loading={UPDATE_WALL_SETTING_PROCESS}
      >
        {!UPDATE_WALL_SETTING_PROCESS && t('button_group.update')}
      </Button>

    </div>
  )
}

export default WallSection