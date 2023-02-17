import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type FavouritesProviderProps = {
  children: ReactNode
}

export type FavItem = {
  id: string
  quantity: number
  name?: string
  imageUrl?: string
}

type FavouritesContextTypes = {
  addToFavourites: (id: string, imageUrl: string, name: string) => void
  removeFromFavourites: (id: string) => void
  // getItemQuantity: (id: string) => number
  getItemQuantityFoo: (id: string) => number
  favItems: FavItem[]
  favQuantity: number
}

const FavouritesContext = createContext({} as FavouritesContextTypes);

export function useFavourites() {
  return useContext(FavouritesContext)
}

export function FavouritesProvider({ children }: FavouritesProviderProps) {
  const [favItems, setFavItems] = useLocalStorage<FavItem[]>("favourites", []);

  console.log(favItems);

  const favQuantity = favItems.length;

  const getItemQuantityFoo = (id: string) => {
    const foo = favItems.find(item => item.id === id)?.quantity || 0;
    return foo
  }


  const addToFavourites = (id: string, imageUrl: string, name: string) => {
    console.log(id);

    setFavItems(currItems => {
      return [...currItems, { id, imageUrl, name, quantity: 1 }]
    })
  }

  const removeFromFavourites = (id: string) => {
    setFavItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  return (
    <FavouritesContext.Provider
      value={{ addToFavourites, favQuantity, removeFromFavourites, favItems, getItemQuantityFoo }}>
      {children}
    </FavouritesContext.Provider>
  )

}