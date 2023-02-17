import React, { createContext, ReactNode, useContext } from 'react'

type CartItem = {
  id: string
  quantity: number
}

type Props = {
  children: ReactNode
  items: CartItem[]
  setItems: React.Dispatch<React.SetStateAction<CartItem>>
  // setItems: () => void
}

type ShoppingProviderProps = {
  children: ReactNode
}


type ShoppingCartContextTypes = {
  // openCart: () => void
  // closeCart: () => void
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

export const ShoppingProvider = ({items, setItems, children}: Props) => {


  const getItemQuantity = (id: string) => {
    return items.find(item => item.id === id)?.quantity || 0;
  }

  const cartQuantity = items.reduce(
    (quantity, item) => item.quantity + quantity, 
    0);

  const addToCart = (id: string) => {
    // setCartItems(currItems => {
    //     return [...currItems, {id, quantity: 1}]
    // })

    setItems((currItems: any) => {
      if (currItems?.find((item: any) => item.id === id) == null) {
      //  console.log(currItems);
        return [...currItems, {id, quantity: 1}]
      } else {
      //  console.log(123);
        return currItems.map((item: any) => {
          if(item.id === id) {
            // console.log(456);
            return {...item, quantity: item.quantity + 1}
          } else {
        //    console.log(789);
            return item
          }
        })
      }
    })

    // localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  const decreaseFromCart = (id: string) => {
    setItems((currItems: any) => {
      // if (currItems.find(item => item.id === id)?.quantity === 1) {
      //   return currItems.filter(item => item.id !== id)
      // } else {
        return currItems.map((item: any) => {
          if(item.id === id) {
            return {...item, quantity: item.quantity - 1}
          } else {
            return item
          }
        })
      // }
    })
  }

  const removeFromCart = (id: string) => {
    const newItems = [...items]
    setItems((currItems: any) => {
        return currItems.filter((item: any) => item.id !== id)
    })
    // setItems(newItems?.filter(item => item.id !== id))
  }

  return (
    <ShoppingCartContext.Provider 
    value={{
      getItemQuantity, 
      addToCart, 
      cartQuantity, 
      items, 
      decreaseFromCart,
      removeFromCart}}>
    {children}
  </ShoppingCartContext.Provider>
  )
}

// export default SomeContext