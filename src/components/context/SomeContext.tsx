import React, { createContext, ReactNode, useContext } from 'react'

type CartItem = {
  id: string
  quantity: number
}

type Props = {
  children: ReactNode
  items: CartItem[]
  setItems: React.Dispatch<React.SetStateAction<CartItem>>
}

type ShoppingCartContextTypes = {
  getItemQuantity: (id: string) => number
  addToCart: (id: string) => void
  decreaseFromCart: (id: string) => void
  removeFromCart: (id: string) => void
  cartQuantity: number
  items: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContextTypes);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export const ShoppingProvider = ({ items, setItems, children }: Props) => {
  const getItemQuantity = (id: string) => {
    return items.find(item => item.id === id)?.quantity || 0;
  }

  const cartQuantity = items.reduce(
    (quantity, item) => item.quantity + quantity,
    0);

  const addToCart = (id: string) => {

    setItems((currItems: any) => {
      if (currItems?.find((item: any) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map((item: any) => {
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
    setItems((currItems: any) => {
      return currItems.map((item: any) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 }
        } else {
          return item
        }
      })
    })
  }

  const removeFromCart = (id: string) => {
    setItems((currItems: any) => {
      return currItems.filter((item: any) => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        addToCart,
        cartQuantity,
        items,
        decreaseFromCart,
        removeFromCart
      }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}