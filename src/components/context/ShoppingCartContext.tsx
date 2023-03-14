import React, { createContext, ReactNode, useContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: string
  quantity: number
}

type ShoppingCartContextTypes = {
  getItemQuantity: (id: string) => number
  addToCart: (id: string) => void
  decreaseFromCart: (id: string) => void
  removeFromCart: (id: string) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContextTypes);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);

  const getItemQuantity = (id: string) => {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0);

  const addToCart = (id: string) => {

    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const decreaseFromCart = (id: string) => {
    setCartItems(currItems => {
      return currItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 }
        } else {
          return item
        }
      })
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        addToCart,
        cartQuantity,
        cartItems,
        decreaseFromCart,
        removeFromCart
      }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}