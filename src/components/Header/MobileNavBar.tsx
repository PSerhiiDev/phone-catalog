import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

type Props = {
  cartQuantity: number
  favQuantity: number
  toggle: () => void
}

const MobileNavBar = ({ cartQuantity, favQuantity, toggle }: Props) => {
  return (
    <div className={styles.mobileNav}>
      <div className={styles.wrapper}>
        <nav>
          <Link to="/" onClick={toggle} className="mobile-nav__link">HOME</Link>
          <Link to="/phones" onClick={toggle} className="mobile-nav__link">PHONES</Link>
          <Link to="/tablets" onClick={toggle} className="mobile-nav__link">TABLETS</Link>
          <Link to="/accessories" onClick={toggle} className="mobile-nav__link">ACCESSORIES</Link>
        </nav>
        <div>
          <Link to="/favorites" className={`${styles.customer} ${styles.favorite}`}>
            {favQuantity > 0 && (
              <div className={styles.counter}>{favQuantity}</div>
            )}
          </Link>
          <Link to="/cart" className={`${styles.customer} ${styles.cart}`}>
            {cartQuantity > 0 && (
              <div className={styles.counter}>{cartQuantity}</div>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MobileNavBar