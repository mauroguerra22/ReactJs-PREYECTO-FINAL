import { combineReducers } from 'redux'
import { FETCH_PRODUCTS_FAVORITE } from '../constants/ActionTypes'

const favorites = (state, action) => {
        return state
}

const byId = (state = {}, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_FAVORITE:
        return {
          ...state,
          ...action.favorites.reduce((obj, favorite) => {
            obj[favorite.id] = favorite
            return obj
          }, {})
        }
      default:
        const { favoriteId } = action
        if (favoriteId) {
          return {
            ...state,
              [favoriteId]: favorites(state[favoriteId], action)
          }
        }
        return state
    }
}

const visibleIds = (state = [], action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_FAVORITE:
        return action.favorites.map(favorite => favorite.id)
      default:
        return state
    }
}
  
export default combineReducers({
    byId,
    visibleIds
})

export const getProductFavorite = (state, id) =>
  state.byId[id]

export const getVisibleProductsFavorites = state =>
  state.visibleIds.map(id => getProductFavorite(state, id))