import React from 'react';
import { Product } from '../../App';
import { useShoppingCart } from '../context/ShoppingCartContext';
import styles from './CartList.module.scss';


type CartListProps = {
  quantity: number
  selectedItem: Product
}

const CartList: React.FC<CartListProps> = ({ quantity, selectedItem }) => {
  const { addToCart, decreaseFromCart, removeFromCart } = useShoppingCart();

  return (
    <div className={styles.cartList}>
      <div className={styles.cartItem}>
        <div className={styles.content}>
          <button
            type="button"
            disabled={false}
            onClick={() => removeFromCart(selectedItem.id)}
          />

          <img
            src={selectedItem?.imageUrl}
            alt="Gadget"
          />

          <p>{selectedItem?.name}</p>
        </div>

        <div className={styles.values}>
          <div className={styles.valuesChange}>

            <button
              type="button"
              className={`${(quantity < 2) && styles['unactive']} ${styles.decrement} `}
              disabled={quantity < 2 ? true : false} // count === 1
              onClick={() => decreaseFromCart(selectedItem.id)}
            />

            <span>{quantity}</span>

            <button
              type="button"
              className={styles.increment}
              disabled={false}
              onClick={() => addToCart(selectedItem.id)}
            />
          </div>

          <h2 className={styles.sum}>{`$${selectedItem?.price * quantity}`}</h2>
        </div>
      </div>
    </div>
  )
}

export default CartList