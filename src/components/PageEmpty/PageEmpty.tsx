import React from 'react';
import styles from './PageEmpty.module.scss';

const PageEmpty = () => {
  return (
    <div className={styles.emptyPage}>
      <h1>Page is empty <span>😕</span></h1>
      <p>
        No items are currently available<br />
        Try again later...      
      </p>
    </div>
  )
}

export default PageEmpty