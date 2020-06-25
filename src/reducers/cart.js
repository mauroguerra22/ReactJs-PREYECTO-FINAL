import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
  CHECKOUT_CART,
  ADD_TO_FAVORITE
} from '../constants/ActionTypes'
import { firebaseApp } from '../firebase'

const Purchases = firebaseApp.database().ref().child('purchases')

const Favorites = firebaseApp.database().ref().child('favorites')


const createFavorite = favorite => {
  let quantity = 0
  
  Favorites.once('value', snap => {
    snap.forEach(quantity++)
  })

  quantity > 0 ? 
    Favorites.child(quantity).push(favorite)
  :
    Favorites.child('0').set(favorite)
}

const createPurchase = state => {
  Purchases.push(state)
}

const initialState = {
  addedIds: [],
  quantityById: {},
  creditCard: '',
  shippingAddress: '',
  customer: 'Cristian'
}

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { productId } = action
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
    default:
      return state
  }
}

const creditCard = ( state = initialState.creditCard ) => {
return state
}

const shippingAddress = ( state = initialState.shippingAddress ) => {
return state
}

const customer = ( state = initialState.customer ) => {
return state
}

export const getQuantity = (state, productId) =>
state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

export const getCustomer = state => state.customer
export const getCreditCard = state => state.creditCard
export const getShippingAddress = state => state.shippingAddress

const cart = (state = initialState, action) => {
switch (action.type) {
  case CHECKOUT_REQUEST:
  return initialState
case CHECKOUT_FAILURE:
  return action.cart
case CHECKOUT_CART:
  const newState = {
    addedIds: state.addedIds,
    quantityById: state.quantityById,
    customer: state.customer,
    creditCard: action.payload.newCreditCard,
    shippingAddress: action.payload.newShippingAddress
  }
  createPurchase(newState)
  return initialState
  case ADD_TO_FAVORITE:
    const newFavorite ={
      id:action.payload.newProduct.id,
      name:action.payload.newProduct.name,
      brand:action.payload.newProduct.brand,
      price:action.payload.newProduct.price,
      description:action.payload.newProduct.description
    }
    createFavorite(newFavorite);
    return initialState;
default:
  return {
    addedIds: addedIds(state.addedIds, action),
    quantityById: quantityById(state.quantityById, action),
    creditCard: creditCard(state.creditCard),
    shippingAddress: shippingAddress(state.shippingAddress),
    customer: customer(state.customer)
  }
}
}

export default cart