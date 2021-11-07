import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: {},
  totalAmount: 0,
  totalPrice: 0,
}

// reducer function that implements all the logic of Cart.
const cartReducer = (state, action) => {
  const newState = {
    ...state,
    items: { ...state.items },
  }
  const item = action.item
  const itemName = action.item.name
  const itemPrice = action.item.price
  const amount = action.item.amount

  newState.items[itemName] = { ...state.items[itemName] }
  // Add
  if (action.type === 'add') {
    addItemToCart(state, newState, item, itemName, itemPrice, amount)
  }
  // Remove
  else if (action.type === 'remove') {
    removeItemFromCart(newState, item, itemName, itemPrice, amount)
  }
  // Update
  else if (action.type === 'update') {
    updateItemFromCart(newState, item, itemName, itemPrice, amount)
  } else if (action.type === 'removeAll') {
    removeAllItemFromCart(newState)
  }
  return newState
}
// helper function to add item
const addItemToCart = (
  state,
  newState,
  item,
  itemName,
  itemPrice,
  addingAmount,
) => {
  if (state.items[itemName]) {
    // item already in the cart
    newState.items[itemName] = {
      ...state.items[itemName],
      amount: state.items[itemName].amount + addingAmount,
    }
  } else {
    // item added for the first time
    newState.items[itemName] = item
  }
  newState.totalPrice += itemPrice * addingAmount
  newState.totalAmount += addingAmount
}
// helper function to remove item
const removeItemFromCart = (newState, item, itemName, itemPrice, amount) => {
  newState.totalPrice -= newState.items[itemName].amount * itemPrice
  newState.totalAmount -= newState.items[itemName].amount
  delete newState.items[itemName]
}
// helper function to update item
const updateItemFromCart = (newState, item, itemName, itemPrice, amount) => {
  const oldAmount = newState.items[itemName].amount
  newState.items[itemName].amount = amount
  const amountDiff = oldAmount - amount
  const priceDiff = amountDiff * itemPrice
  newState.totalAmount -= amountDiff
  newState.totalPrice -= priceDiff
}
const removeAllItemFromCart = (newState) => {
  delete newState.items
  newState.totalAmount = 0
  newState.totalPrice = 0
}
// Provider component
const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState)
  const addItemToCartHandler = (item) => {
    dispatchCart({ type: 'add', item: item })
  }
  const removeItemFromCartHandler = (item) => {
    dispatchCart({ type: 'remove', item: item })
  }
  const updateItemFromCartHandler = (item) => {
    dispatchCart({ type: 'update', item })
  }
  const removeAllFromCartHandler = () => {
    dispatchCart({ type: 'removeAll', item: {} })
  }
  const cartContext = {
    items: { ...cartState.items },
    totalAmount: cartState.totalAmount,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    updateItem: updateItemFromCartHandler,
    removeAll: removeAllFromCartHandler,
  }
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
