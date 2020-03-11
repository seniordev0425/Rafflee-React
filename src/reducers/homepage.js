const initialFeedState = {
    hotPromotions: [],
    highlightedPromotions: [],
    newPromotions: [],
    bestOfferPromotions: []
    
}

function Homepage(state = initialFeedState, action){
    switch(action.type){
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
        case 'UPDATE_FAVORITE_SUCCESS':
            if (action.arrname === 'hot') {
                return {
                    ...state,
                    hotPromotions: state.hotPromotions.map(promotion => promotion.pk === action.id ?
                        {...promotion, favorite: !promotion.favorite} : promotion
                    )
                }
            }
            else if (action.arrname === 'highlight') {
                return {
                    ...state,
                    highlightedPromotions: state.highlightedPromotions.map(promotion => promotion.pk === action.id ?
                        {...promotion, favorite: !promotion.favorite} : promotion
                    )
                }
            }
            else if (action.arrname === 'new') {
                return {
                    ...state,
                    newPromotions: state.newPromotions.map(promotion => promotion.pk === action.id ?
                        {...promotion, favorite: !promotion.favorite} : promotion
                    )
                }
            }
            else {
                return {
                    ...state,
                    bestOfferPromotions: state.bestOfferPromotions.map(promotion => promotion.pk === action.id ?
                        {...promotion, favorite: !promotion.favorite} : promotion
                    )
                }
            }
        default:
            return state
    }
}

export default Homepage;