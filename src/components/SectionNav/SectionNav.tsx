import React from 'react'
import { Link } from 'react-router-dom';
import styles from './SectionNav.module.scss';

type Props = {
  title: string
  productName?: string
};

const SectionNav: React.FC<Props> = ({title, productName}) => {

  const linkTitle = title === 'Mobile phones' ? 'Phones' : title;

  return (
    <div className={styles.pagePath}>
      <Link to="/"  />
      <p className={styles.sectionName}>{linkTitle}</p>
      {productName &&
        <p className={styles.modelName}>{productName}</p>
      }
    </div> 
  )
}

export default SectionNav;