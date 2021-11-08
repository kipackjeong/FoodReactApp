import React, { useContext, useEffect, useState } from 'react'
import styles from './NavBar.module.css'
import Button from '../UI/Button'
import CartCounter from '../Cart/CartCounter'
import CartContext from '../../store/cart-context'
import cartIcon from '../../assets/icons/cart-icon.png'

const NavBar = (props) => {
  const cartCtx = useContext(CartContext)
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)

  useEffect(() => {
    if (cartCtx.totalAmount === 0) {
      return
    }
    setBtnIsHighlighted(true)
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [cartCtx.totalAmount])

  const counterClass = `${styles['cart-btn']} ${
    btnIsHighlighted ? styles.bump : ''
  }`
  return (
    <>
      <div>
        <h1>KoreanMeals</h1>
      </div>
      <div className={styles['cart-btn-container']}>
        <Button className={counterClass} onClick={props.onCartClicked}>
          <img src={cartIcon} alt="cart icon" />
        </Button>
        <CartCounter quantity={cartCtx.totalAmount} />
      </div>
    </>
  )
}

export default NavBar
