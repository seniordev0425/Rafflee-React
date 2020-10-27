const initialFeedState = {
  ///////////////////////////////////////////// This state is for all promotions
  allPromotions: [],

  ///////////////////////////////////////////// This state is for hot promotions array in homepage(first page)
  hotPromotions: [],

  ///////////////////////////////////////////// This state is for highlight promotions array in homepage(first page)
  highlightedPromotions: [],

  ///////////////////////////////////////////// This state is for new promotions array in homepage(first page)
  newPromotions: [],

  ///////////////////////////////////////////// This state is for bestoffer promotions array in homepage(first page)
  bestOfferPromotions: [],

  ///////////////////////////////////////////// This state is for categories array in homepage(first page)
  categories: [],

  ///////////////////////////////////////////// This state is for recruitments data in career page
  recruitmentData: {
    max_page: 0,
    recruitments: [],
    nbr_of_recruitments: 0
  }
}

function Homepage(state = initialFeedState, action) {
  switch (action.type) {
    case 'GET_ALL_PROMOTIONS_SUCCESS':
      return {
        ...state,
        allPromotions: action.data
      }
    case 'GET_HOT_PROMOTIONS_SUCCESS':
      return {
        ...state,
        hotPromotions: action.data
      }
    case 'GET_HIGHLIGHTED_PROMOTIONS_SUCCESS':
      return {
        ...state,
        highlightedPromotions: action.data
      }
    case 'GET_NEW_PROMOTIONS_SUCCESS':
      return {
        ...state,
        newPromotions: action.data
      }
    case 'GET_BEST_PROMOTIONS_SUCCESS':
      return {
        ...state,
        bestOfferPromotions: action.data
      }
    case 'GET_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.data
      }
    case 'SET_RECRUITMENT_DATA':
      return {
        ...state,
        recruitmentData: action.data
      }
    case 'UPDATE_FAVORITE_SUCCESS':
      if (action.arrname === 'hot') {
        return {
          ...state,
          hotPromotions: state.hotPromotions.map(promotion => promotion.pk === action.id ?
            { ...promotion, favorite: !promotion.favorite } : promotion
          )
        }
      }
      else if (action.arrname === 'highlight') {
        return {
          ...state,
          highlightedPromotions: state.highlightedPromotions.map(promotion => promotion.pk === action.id ?
            { ...promotion, favorite: !promotion.favorite } : promotion
          )
        }
      }
      else if (action.arrname === 'new') {
        return {
          ...state,
          newPromotions: state.newPromotions.map(promotion => promotion.pk === action.id ?
            { ...promotion, favorite: !promotion.favorite } : promotion
          )
        }
      }
      else if (action.arrname === 'bestoffer') {
        return {
          ...state,
          bestOfferPromotions: state.bestOfferPromotions.map(promotion => promotion.pk === action.id ?
            { ...promotion, favorite: !promotion.favorite } : promotion
          )
        }
      }
      else if (action.arrname === 'all') {
        return {
          ...state,
          allPromotions: state.allPromotions.map(promotion => promotion.pk === action.id ?
            { ...promotion, favorite: !promotion.favorite } : promotion
          )
        }
      }
      break;
    default:
      return state
  }
}

export default Homepage;