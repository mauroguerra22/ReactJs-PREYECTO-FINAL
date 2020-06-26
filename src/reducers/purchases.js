import { combineReducers } from 'redux'
import { FETCH_PURCHASES } from '../constants/ActionTypes'

const purchases = (state, action) => {
        return state
}

const byId = (state = {}, action) => {
    switch (action.type) {
      case FETCH_PURCHASES:
        return {
          ...state,
          ...action.purchases.reduce((obj, purchase) => {
            obj[purchase.id] = purchase
            return obj
          }, {})
        }
      default:
        const { purchaseId } = action
        if (purchaseId) {
          return {
            ...state,
              [purchaseId]: purchases(state[purchaseId], action)
          }
        }
        return state
    }
}

const visibleIds = (state = [], action) => {
    switch (action.type) {
      case FETCH_PURCHASES:
        return action.purchases.map(purchase => purchase.id)
      default:
        return state
    }
}
  
export default combineReducers({
    byId,
    visibleIds
})

export const getProductPurchases = (state, id) =>
  state.byId[id]

export const getVisiblePurchases = state =>
  state.visibleIds.map(id => getProductPurchases(state, id))