import React, { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import { useShoppingCart } from '../context/ShoppingCartContext';
import Search from '../Search/Search';
import { useMediaQuery } from "react-responsive"
import styles from './Header.module.scss';
import MobileNavBar from './MobileNavBar';
import { MenuToggle } from './MenuToggle';

//https://github.com/ipenywis/react-navbar-responsive/blob/master/src/components/navbar/mobileNavLinks.jsx

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  let location = useLocation();
  const { cartQuantity } = useShoppingCart();
  const { favQuantity } = useFavourites();
  const isMobile = useMediaQuery({ maxWidth: 800 });

  return (
    <header className={styles.header}
    >

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
        {(location.pathname === '/phones' ||
          location.pathname === "/tablets" ||
          location.pathname === "/accessories") ?
          <Search />
          : null
        }
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
<MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
{/* <MobileNavBar cartQuantity={cartQuantity}  favQuantity={favQuantity}/> */}
      </div>
    </header>
  )
}

export default Header