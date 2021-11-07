import { useState, useContext } from 'react'
import './App.css'
import Header from './components/Layout/Header'
import Main from './components/Layout/Main'
import Menu from './components/Menu/Menu'
import Cart from './components/Cart/Cart'
import Modal from './components/UI/Modal'
import CartContext from './store/cart-context'
import CartProvider from './store/CartProvider'
import NavBar from './components/NavBar/NavBar'
function App() {
  const [cartClicked, setCartClicked] = useState(false)
  const cartCtx = useContext(CartContext)

  const onCartClickedHandler = (event) => {
    setCartClicked(cartClicked ? false : true)
  }
  const onCancelHandler = () => {
    setCartClicked(false)
  }
  const onOrderHandler = () => {
    console.log(cartCtx.items)
    console.log(
      'ordering ' +
        Object.keys(cartCtx.items)
          .map(
            (item) =>
              `${cartCtx.items[item].amount} ${cartCtx.items[item].name}`,
          )
          .join(', '),
    )
    cartCtx.removeAll()
    setCartClicked(false)
  }

  return (
    <div className="App">
      <Header>
        <NavBar onCartClicked={onCartClickedHandler} />
      </Header>
      {cartClicked && (
        <Modal>
          <Cart onCancel={onCancelHandler} onOrder={onOrderHandler}></Cart>
        </Modal>
      )}
      <Main>
        <Menu></Menu>
      </Main>
    </div>
  )
}

export default App
