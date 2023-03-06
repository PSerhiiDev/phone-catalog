import React from 'react';

import styles from './Footer.module.scss';



const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.wrapper}>
        <a href="/" className={`logo ${styles.footer_logo}`} />

        <nav className="nav footer__nav">
          <a href="/" className={styles.navLink}>GITHUB</a>
          <a href="/" className={styles.navLink}>LINKEDIN</a>
          <a href="/" className={styles.navLink}>RIGHTS</a>
        </nav>

        <div className={styles.upBtn}>
          <p className={styles.navLink}>Back to top</p>
          <button
            type="button"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            { }
          </button>
        </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer