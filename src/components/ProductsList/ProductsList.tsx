import React from 'react'
import { Product } from '../../types';
import PageEmpty from '../PageEmpty/PageEmpty';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[] | null | '';
}

const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <>
      {products && products.length > 0 ? (
        <div className={styles.productList}>
          {products.map(product => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>) :
        <PageEmpty />
      }
    </>
  )
}
export default ProductsList