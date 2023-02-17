import React from 'react';
import { Product } from '../../App';
import { CategoryType } from '../Categories/Categories';

import styles from './CategoryCard.module.scss';

type Props = {
  categoryData: CategoryType
}

const Category: React.FC<Props> = ({ categoryData }) => {
  return (
    < >
      <a href={`/${categoryData.name}`} className={styles.category} >
        <div className={styles.imageContainer}>
          <img src={categoryData.img} alt={categoryData.name} />
        </div>
      </a>
      <div className={styles.title}>
        {categoryData.name === 'phones' ? 'mobile phones' : categoryData.name}
      </div>
      <div className={styles.quantity}>
        {categoryData.length} models
      </div>
    </>
  )
}

export default Category