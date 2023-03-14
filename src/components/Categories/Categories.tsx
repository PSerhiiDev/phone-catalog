import React from 'react';
import { PropertyByCategory } from '../../types';
import CategoryCard from '../CategoryCard/CategoryCard';
import styles from './Categories.module.scss';

type Props = {
  productByCategory: PropertyByCategory
}

export type CategoryType = {
  name: string;
  img: string;
  length: number
}

const Categories: React.FC<Props> = ({ productByCategory }) => {

  const categoriesData: CategoryType[] = [{
    name: 'phones',
    img: './img/link-banners/link-mobile.png',
    length: productByCategory?.phones?.length
  },
  {
    name: 'tablets',
    img: './img/link-banners/link-tablets.png',
    length: productByCategory?.tablets?.length
  },
  {
    name: 'accessories',
    img: './img/link-banners/link-accesories.png',
    length: productByCategory?.accessories?.length
  }
  ];

  const categoryItems = categoriesData.map((categoryData, index) => (
    <div className={styles.categoryCardItem} key={index}>
      <CategoryCard categoryData={categoryData} />
    </div>
  ));

  return (
    <div className={styles.categories}>
      <h2 className="section-title">Shop by category</h2>
      <div className={styles.wrapper}>
        {categoryItems}
      </div>
    </div>
  )
}

export default Categories