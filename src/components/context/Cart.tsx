import React, { useState } from 'react'
import { ShoppingProvider } from './SomeContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      <ShoppingProvider children  items={cartItems} setItems={setCartItems as ()=> void}/>
    </div>
  )
}

export default Cart