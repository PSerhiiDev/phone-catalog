import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import { useShoppingCart } from '../context/ShoppingCartContext';
import Search from '../Search/Search';
import styles from './Header.module.scss';
import MobileNavBar from './MobileNavBar';
import { MenuToggle } from './MenuToggle';

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  let location = useLocation();
  const { cartQuantity } = useShoppingCart();
  const { favQuantity } = useFavourites();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>

        <div className={styles.nav}>
          <Link to="/" className={`logo ${styles.headerLogo}`} />
          <nav>
            <NavLink to="/" className="nav__link">HOME</NavLink>
            <NavLink to="/phones" className="nav__link">PHONES</NavLink>
            <NavLink to="/tablets" className="nav__link">TABLETS</NavLink>
            <NavLink to="/accessories" className="nav__link">ACCESSORIES</NavLink>
          </nav>
        </div>
        <div className={styles.side}>
          <div className={styles.search_bar}>
            {(location.pathname === '/phones' ||
              location.pathname === "/tablets" ||
              location.pathname === "/accessories") ?
              <Search />
              : null
            }
          </div>
          <div className={styles.header_cart_buttons}>

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
          <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
        </div>
        <div className={styles.mobile__search_bar}>
          {(location.pathname === '/phones' ||
            location.pathname === "/tablets" ||
            location.pathname === "/accessories") ?
            <Search />
            : null
          }
        </div>
      </header>
      {isOpen && (
        <MobileNavBar cartQuantity={cartQuantity} favQuantity={favQuantity}
          toggle={() => setOpen(!isOpen)} />
      )}
    </div>
  )
}

export default Header