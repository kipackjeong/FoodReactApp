import React, { useContext, useState } from 'react'
import styles from './CartItem.module.css'
import QuantityInput from '../UI/QuantityInput'
import CartContext from '../../store/cart-context'

const CartItem = (props) => {
  const cartCtx = useContext(CartContext)
  const [amount, setAmount] = useState(props.item.amount)

  const onUpdateBtnClickHandler = (event) => {
    props.item.amount = amount
    cartCtx.updateItem(props.item)
  }
  const onRemoveBtnClickHandler = (event) => {
    cartCtx.removeItem(props.item)
  }
  const onInputChangeHandler = (event) => {
    setAmount(event.target.value)
  }

  const itemTotalPrice = (props.item.price * props.item.amount).toFixed(2)

  return (
    <tr className={styles.cartItem}>
      <td>
        <img className={styles.img} src={props.item.img} alt={props.name} />
      </td>
      <td>
        <span>{props.item.name}</span>
      </td>
      <td>
        <QuantityInput
          defaultValue={props.item.amount}
          onChange={onInputChangeHandler}
        />
      </td>
      <td>
        <span>{`$${itemTotalPrice}`}</span>
      </td>
      <td>
        <button className={styles.button} onClick={onUpdateBtnClickHandler}>
          update
        </button>
      </td>
      <td>
        <button className={styles.removeBtn} onClick={onRemoveBtnClickHandler}>
          remove
        </button>
      </td>
    </tr>
  )
}

export default CartItem
