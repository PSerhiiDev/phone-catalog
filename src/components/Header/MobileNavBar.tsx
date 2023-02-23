import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

type Props = {
  cartQuantity: number
  favQuantity: number
}

const MobileNavBar = ({cartQuantity, favQuantity}: Props) => {
  return (
    <div className={styles.mobileNav}>
   <nav>
          <NavLink to="/" className="nav__link">HOME</NavLink>
          <NavLink to="/phones" className="nav__link">PHONES</NavLink>
          <NavLink to="/tablets" className="nav__link">TABLETS</NavLink>
          <NavLink to="/accessories" className="nav__link">ACCESSORIES</NavLink>
        </nav>

        <div>

        <NavLink to="/favorites" className={`${styles.customer} ${styles.favorite}`}>
          {favQuantity > 0 && (
            <div className={styles.counter}>{favQuantity}</div>
          )}
        </NavLink>
        <NavLink to="/cart" className={`${styles.customer} ${styles.cart}`}>
          {cartQuantity > 0 && (
            <div className={styles.counter}>{cartQuantity}</div>
          )}

        </NavLink>
</div>
</div>
  )
}

export default MobileNavBar