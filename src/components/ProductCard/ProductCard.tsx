import React from 'react'
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import CardButtons from '../CardButtons/CardButtons';

import styles from './ProductCard.module.scss';

type Props = {
  item: Product;
}

const ProductCard: React.FC<Props> = ({ item }) => {
  return (
    <div className={styles.productCard}>
      <Link to={`/phones/${item.id}`}
      >
        <div className={styles.imageContainer}>
          <img src={`/${item.imageUrl}`} alt={item.name} />
        </div>
        <div className={styles.name}>{item.name}</div>
      </Link>

      <div className={styles.price}>
        <p className={styles.discount}>
          {item.discount !== 0 ? (
            `$${Math.floor(item.price - (item.price * (item.discount / 100)))}`
          ) : (
            null
          )}
        </p>

        <p className={
          item.discount === 0 ? styles.discount : styles.initial
        }>${item.price}</p>

      </div>
      <div className={styles.divider} />
      <div className={styles.description}>
        <div className={styles.property}>Screen</div>
        <div className={styles.value}>{item.screen}</div>
      </div>
      <div className={styles.description}>
        <div className={styles.property}>Capacity</div>
        <div className={styles.value}>{item.capacity}</div>
      </div>
      <div className={styles.description}>
        <div className={styles.property}>RAM</div>
        <div className={styles.value}>{item.ram}</div>
      </div>
      <CardButtons id={item.id} imageUrl={item.imageUrl} name={item.name} />
    </div>
  )
}

export default ProductCard