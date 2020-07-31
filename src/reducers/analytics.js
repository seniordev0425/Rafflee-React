const initialFeedState = {

  ///////////////////////////////////////////// Daily followers data in overview section
  overviewDayFollowers: [],

  ///////////////////////////////////////////// Weekly followers data in overview section           
  overviewWeekFollowers: [],

  ///////////////////////////////////////////// Monthly followers data in overview section         
  overviewMonthFollowers: [],

  ///////////////////////////////////////////// Yearly followers data in overview section       
  overviewYearFollowers: [],

  ///////////////////////////////////////////// Gender percentages in audience section   
  activeGender: {
    unknow: 0,
    female_percentage: 0,
    male: 0,
    male_percentage: 0,
    unknow_percentage: 0,
    female: 0
  },

  ///////////////////////////////////////////// ActionDemographics data for google map in audience section
  overralActionDemographics: [],

  ///////////////////////////////////////////// ParticipationDemographics data for google map in audience section
  overralParitipationDemographics: [],

  ///////////////////////////////////////////// This state is a campaign list for google map filter in audience section
  campaignsInformations: [],

  ///////////////////////////////////////////// This state is a clicks data for graphs in clicks section
  clicksData: [],

  ///////////////////////////////////////////// This state is a participants range data by age in audience section
  participantsRangeByAge: {
    range_percentage: {
      "25_34": 0,
      "18_24": 0,
      "13_17": 0,
      "35_44": 0,
      "45_54": 0,
      "55_65": 0,
      "65": 0
    },
    range: {
      "25_34": 0,
      "18_24": 0,
      "13_17": 0,
      "35_44": 0,
      "45_54": 0,
      "55_65": 0,
      "65": 0
    }
  }
}

function Analytics(state = initialFeedState, action) {
  switch (action.type) {
    case 'SET_OVERVIEW_FOLLOWERS':
      if (action.time === 'day') {
        return {
          ...state,
          overviewDayFollowers: action.followers
        }
      } else if (action.time === 'week') {
        return {
          ...state,
          overviewWeekFollowers: action.followers
        }
      } else if (action.time === 'month') {
        return {
          ...state,
          overviewMonthFollowers: action.followers
        }
      } else if (action.time === 'year') {
        return {
          ...state,
          overviewYearFollowers: action.followers
        }
      }
    case 'SET_ACTIVE_GENDER':
      return {
        ...state,
        activeGender: action.data
      }
    case 'SET_OVERRAL_DEMOGRAPHICS':
      if (action.demographics_type === 'action') {
        return {
          ...state,
          overralActionDemographics: action.data
        }
      } else {
        return {
          ...state,
          overralParitipationDemographics: action.data
        }
      }
    case 'SET_CAMPAIGNS_INFORMATIONS':
      return {
        ...state,
        campaignsInformations: action.data
      }
    case 'SET_CLICKS_DATA':
      return {
        ...state,
        clicksData: action.data
      }
    case 'SET_PARTICIPANTS_BY_AGE':
      return {
        ...state,
        participantsRangeByAge: action.data
      }
    default:
      return state
  }
}

export default Analytics;