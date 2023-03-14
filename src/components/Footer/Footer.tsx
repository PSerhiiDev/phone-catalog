import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.wrapper}>
          <Link to="/" className={`logo ${styles.footer_logo}`} />

          <nav className="nav footer__nav">
            <a href="https://github.com/Serhii-P?tab=repositories" target="_blank" rel="noreferrer" className={styles.navLink}>GITHUB</a>
            <a href="https://www.linkedin.com/in/serhii-pyskun-2622b4194/" target="_blank" rel="noreferrer" className={styles.navLink}>LINKEDIN</a>
            <a className={styles.navLink}>RIGHTS</a>
          </nav>

          <div className={styles.upBtn}>
            <p className={styles.navLink}>Back to top</p>
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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