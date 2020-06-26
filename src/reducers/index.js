import { combineReducers } from 'redux' //uso esto cuando uso redux para distintas cosas es como tener dos reducers. (TENER COMO GRUPO DE FUNCIONALIDAES)
import cart, * as fromCart from './cart'
import products, * as fromProducts from './product'
import favorites, * as fromFavorites from './favorite'
import purchases, * as fromPurchases from './purchases'

export default combineReducers({
  cart,
  products,
  favorites,
  purchases
})

const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)
const getFavorite = (state, id) => fromFavorites.getFavorite(state.favorites, id)
const getProductPurchases = (state, id) => fromPurchases.getProductPurchases(state.purchases, id)
const getCustomer = (state) => fromCart.getCustomer(state.cart)
const getShippingAddress = (state) => fromCart.getShippingAddress(state.cart)
const getCreditCard = (state) => fromCart.getCreditCard(state.cart)

export const getTotal = state =>
  getAddedIds(state)
    .reduce((total, id) =>
      total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
    .toFixed(2)

export const getCartProducts = state =>
  getAddedIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id)
  }))

  export const getInfoCustomer = state => getCustomer(state)
  export const getInfoCreditCard = state => getCreditCard(state)
  export const getInfoShippingAddress = state => getShippingAddress(state)
  export const getInfoProductFavorite = state => getFavorite(state)
  export const getInfoProductPurchases = state => getProductPurchases(state)