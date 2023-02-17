import React from 'react'
import { Product } from '../../App';
import PageEmpty from '../PageEmpty/PageEmpty';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[] | null | '';
}

const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.productList}>
      {products && products.length > 0 ?
        products.map(product => (
          <ProductCard key={product.id} item={product} />
        )) :
        <PageEmpty />

      }

    </div>
  )
}
export default ProductsList