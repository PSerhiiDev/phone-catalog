import React, { createContext, useEffect, useState } from 'react';
import './App.scss';
import { Routes, Route } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import { getAllProducts } from './api';
import ProductPage from './pages/ProductPage/ProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import NotFound from './components/NotFoundBlock/NotFound';
import CartPage from './pages/CartPage/CartPage';
import { ShoppingCartProvider } from './components/context/ShoppingCartContext';
import { FavouritesProvider } from './components/context/FavouritesContext';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import { ShoppingProvider } from './components/context/SomeContext';

export type Product = {
  age: number
  capacity: string
  discount: number
  id: string
  imageUrl: string
  name: string
  price: number
  ram: string
  screen: string
  snippet: string
  type: string
}

export interface PropertyByCategory {
  phones: Product[],
  tablets: Product[],
  accessories: Product[]
}
interface IThemeContext {
  searchValue: string;
  setSearchValue?: () => void;
}


export type ThemeContextType = {
  searchValue: string;
  setSearchValue?: () => void;
};

const appCtxDefaultValue = {
  searchValue: '',
  setSearchValue: (searchValue: string) => { } // noop default callback
};

const defaultState: ThemeContextType = {
  searchValue: '',
};
export const SearchContext = createContext(appCtxDefaultValue);

const App: React.FC = () => {
  useEffect(() => {
    getAllProducts().then(res => setProductList(res))
  }, []);

  const [productList, setProductList] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const phones = productList?.filter(item => item.type === 'phone');
  const tablets = productList?.filter(item => item.type === 'tablet');
  const accessories = productList?.filter(item => item.type === 'accessory');

  const productByCategory = {
    phones, tablets, accessories
  };

  const routes = [
    {
      path: '/phones',
      title: 'Mobile phones',
      component: phones,
    }, {
      path: '/tablets',
      title: 'Tablets',
      component: tablets,
    }, {
      path: '/accessories',
      title: 'Accessories',
      component: accessories,
    }];

  const linkTitle = routes.map(route => (
    route.title === 'Mobile phones' ? 'Phones' : route.title
  ))

  return (
    <div className="app">
      {/* <SearchContext.Provider value={{searchValue, setSearchValue}}> */}
      <ShoppingCartProvider>
        {/* <ShoppingProvider> */}
        <FavouritesProvider>
          <Routes>
            <Route path='/' element={< MainLayout />}>
              <Route path="" element={<HomePage productList={productList}
                productByCategory={productByCategory} />} />
              {/* {selectRoute} */}

              {/* {routes.map((route, index) => (
                <Route key={index} path={route.path} 
                    element={<ProductPage productInfo={route.component} title={route.title}
                    />} >
                  <Route path={`${route.path}/:productId`} element={<ProductDetailsPage />} />
                </Route>
              ))} */}


              <Route path="/phones"
                element={<ProductPage productInfo={phones}
                  title='Mobile phones' />} />
              <Route path="/phones/:productId"
                element={<ProductDetailsPage productList={productList}
                  title='Mobile phones' />} />

              <Route path="/tablets"
                element={<ProductPage productInfo={tablets}
                  title='Tablets' />} />
              <Route path="/tablets/:productId"
                element={<ProductDetailsPage productList={productList}
                  title='Tablets' />} />

              <Route path="/accessories"
                element={<ProductPage productInfo={accessories}
                  title='Accessories' />} />
              <Route path="/accessories/:productId"
                element={<ProductDetailsPage productList={productList}
                  title='Accessories' />} />

              <Route path="/cart" element={<CartPage productList={productList} />} />
              <Route path="/favorites" element={<FavoritesPage productList={productList} />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>

        </FavouritesProvider>

        {/* </ShoppingProvider> */}

      </ShoppingCartProvider>

      {/* </SearchContext.Provider> */}
    </div>
  );
}

export default App;
