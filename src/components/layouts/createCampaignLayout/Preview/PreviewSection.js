import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Button } from 'antd'
import PreviewCustomCollapsePanel from '../../../common/PreviewCustomCollapsePanel'
import PreviewCustomCollapsePanelForPoll from '../../../common/PreviewCustomCollapsePanelForPoll'
import images from '../../../../utils/images'
import moment from 'moment'

import { useTranslation } from 'react-i18next'

function PreviewSection(props) {
  const { t } = useTranslation()

  const { params, setSection } = props

  const companyProfile = useSelector(state => state.userInfo.companyProfile)

  const renderWinnings = () => {
    return (
      (params.winnings).map((item, index) =>
        <div key={index} className="mt-3 color-blue font-size-11">{`- ${item.name}`}</div>
      )
    )
  }

  // Returns remaining dates
  const calcRemainingDates = () => {
    const currentDate = moment(Date.now())
    const endDate = moment(Date.parse(params.end_date))

    const diff = endDate.diff(currentDate)
    const diffDuration = moment.duration(diff)

    return diffDuration.asDays() > 0 ? Math.round(diffDuration.asDays()) : 0
  }

  // Returns maximum participants
  const calcMaximumParticipants = () => {
    if (params.campaign_type === 'giveaway') return 0
    let max_participants = 0
    // if campaign type is 'reward' then maximum participants is calculated by sum of every prize's number of people
    params.winnings.forEach(item => max_participants += parseInt(item.number_of_people || '0'))
    return max_participants
  }

  return (
    <Row>
      <Col sm={{ size: "10", offset: "1" }} xs="12" className="padding-x">
        <div className="mt-5 mb-3 mx-3">
          <Row className="px-3 mt-5">
            <Col className="px-0" style={{ borderRight: "1px solid #767b8378" }}>
              <div className="color-gray mt-2 text-center font-weight-bold font-size-20">{calcRemainingDates()}</div>
              <div className="color-gray mt-2 text-center">{t('campaign_detail_page.days')}</div>
            </Col>
            <Col className="px-0" style={{ borderRight: "1px solid #767b8378" }}>
              <div className="color-gray mt-2 text-center font-weight-bold font-size-20">0</div>
              <div className="color-gray mt-2 text-center">{t('campaign_detail_page.entries')}</div>
            </Col>
            <Col className="px-0">
              <div className="color-gray mt-2 text-center font-weight-bold font-size-20">{calcMaximumParticipants()}</div>
              <div className="color-gray mt-2 text-center">{t('campaign_detail_page.participants')}</div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <div className="d-flex justify-content-center">
                <img src={params.promotion_picture ? params.promotion_picture : images.campaign} width="100%" style={{ maxHeight: 500, objectFit: 'contain' }} alt="" />
              </div>
            </Col>
          </Row>
          <Row className="my-5">
            <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img p-0">
              <div>
                <img src={companyProfile.logo ? companyProfile.logo : images.profile_img} alt="" />
                <div className="mt-3 color-blue font-weight-bold">{companyProfile.company_name}</div>
              </div>
            </Col>
            <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
              <div className="promotion-list-item-title">{params.promotion_name}</div>
              <div style={{ width: "70%" }} className="promotion-list-item-text">{params.promotion_long_description}</div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <div className="pb-5" style={{ borderBottom: '2px solid #F3F4F7' }}>
                <div className="color-blue font-size-14 font-weight-bold">{t('campaign_detail_page.the_prize')}</div>
                <div className="mt-3 color-gray font-size-11">{t('campaign_detail_page.prize_description')}</div>
                {renderWinnings()}
              </div>
            </Col>
          </Row>

          {params.facebook.page &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.facebook_page.title')}
                  text={t('campaign_detail_page.facebook_page.text')}
                  socialName="facebook"
                  mandatory={params.facebook.page_mandatory}
                  entries={params.facebook.page_entries}
                />
              </Col>
            </Row>
          }
          {params.facebook.post &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.facebook_post.title')}
                  text={t('campaign_detail_page.facebook_post.text')}
                  socialName="facebook"
                  mandatory={params.facebook.post_mandatory}
                  entries={params.facebook.post_entries}
                />
              </Col>
            </Row>
          }
          {params.facebook.url &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.facebook_url.title')}
                  text={t('campaign_detail_page.facebook_url.text')}
                  socialName="facebook"
                  mandatory={params.facebook.url_mandatory}
                  entries={params.facebook.url_entries}
                />
              </Col>
            </Row>
          } 
          {params.instagram.profile &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.instagram_follow.title')}
                  text={t('campaign_detail_page.instagram_follow.text')}
                  socialName="instagram"
                  mandatory={params.instagram.profile_mandatory}
                  entries={params.instagram.profile_entries}
                />
              </Col>
            </Row>
          }
          {params.instagram.publication &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.instagram_like.title')}
                  text={t('campaign_detail_page.instagram_like.text')}
                  socialName="instagram"
                  mandatory={params.instagram.publication_mandatory}
                  entries={params.instagram.publication_entries}
                />
              </Col>
            </Row>
          }
          {params.twitter.like &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.twitter_like.title')}
                  text={t('campaign_detail_page.twitter_like.text')}
                  socialName="twitter"
                  mandatory={params.twitter.like_mandatory}
                  entries={params.twitter.like_entries}
                />
              </Col>
            </Row>
          }
          {params.twitter.follow &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.twitter_follow.title')}
                  text={t('campaign_detail_page.twitter_follow.text')}
                  socialName="twitter"
                  mandatory={params.twitter.follow_mandatory}
                  entries={params.twitter.follow_entries}
                />
              </Col>
            </Row>
          }
          {params.twitter.comment &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.twitter_tweet.title')}
                  text={t('campaign_detail_page.twitter_tweet.text')}
                  socialName="twitter"
                  mandatory={params.twitter.comment_mandatory}
                  entries={params.twitter.comment_entries}
                />
              </Col>
            </Row>
          }
          {params.twitter.retweet &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.twitter_retweet.title')}
                  text={t('campaign_detail_page.twitter_retweet.text')}
                  socialName="twitter"
                  mandatory={params.twitter.retweet_mandatory}
                  entries={params.twitter.retweet_entries}
                />
              </Col>
            </Row>
          }
          {params.twitch.follow &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.twitch_follow.title')}
                  text={t('campaign_detail_page.twitch_follow.text')}
                  socialName="twitch"
                  mandatory={params.twitch.follow_mandatory}
                  entries={params.twitch.follow_entries}
                />
              </Col>
            </Row>
          }
          {params.tiktok.profile &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.tiktok_follow.title')}
                  text={t('campaign_detail_page.tiktok_follow.text')}
                  socialName="tiktok"
                  mandatory={params.tiktok.profile_mandatory}
                  entries={params.tiktok.profile_entries}
                />
              </Col>
            </Row>
          }
          {params.tiktok.publication &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.tiktok_like.title')}
                  text={t('campaign_detail_page.tiktok_like.text')}
                  socialName="tiktok"
                  mandatory={params.tiktok.publication_mandatory}
                  entries={params.tiktok.publication_entries}
                />
              </Col>
            </Row>
          }
          {params.url_video.video &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.video.title')}
                  text={t('campaign_detail_page.video.text')}
                  socialName="video"
                  mandatory={params.url_video.mandatory}
                  entries={params.url_video.entries}
                />
              </Col>
            </Row>
          }
          {params.url_website.website &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.website.title')}
                  text={params.url_website.url}
                  socialName="website"
                  mandatory={params.url_website.mandatory}
                  entries={params.url_website.entries}
                />
              </Col>
            </Row>
          }
          {params.poll !== 'false' &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanelForPoll
                  title={params.poll.question}
                  text={t('campaign_detail_page.poll.text')}
                  multiple_choice={params.poll.mutiples_choices}
                  responses={params.poll.response}
                  mandatory={params.poll.mandatory}
                  entries={params.poll.entries}
                />
              </Col>
            </Row>
          }
        </div>
        <Row>
          <Col>
            <Button
              type="primary"
              className="ant-blue-btn my-5"
              style={{ width: 150 }}
              onClick={() => setSection('payment')}
            >
              {t('button_group.next')}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PreviewSection