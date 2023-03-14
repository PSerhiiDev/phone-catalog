import BackButton from '../../components/BackButton/BackButton'
import CartList from '../../components/CartList/CartList';
import { useShoppingCart } from '../../components/context/ShoppingCartContext';
import { Product } from '../../types';
import styles from './CartPage.module.scss';

type CartPageProps = {
  productList: Product[];
}

const CartPage = ({ productList }: CartPageProps) => {

  const { cartItems } = useShoppingCart();
  const cartItemsList = cartItems.map(item => {
    const selectedItem = productList.find(i => i.id === item.id)

    return <CartList
      key={item.id}
      quantity={item.quantity}
      selectedItem={selectedItem!}
    />
  })

  const totalSum = cartItems.reduce((total, cartItem) => {
    const item = productList.find(i => i.id === cartItem.id)
    return total + (item?.price || 0) * cartItem.quantity
  }, 0);

  return (
    <>
      <BackButton />
      {cartItemsList && cartItemsList.length > 0 ? (
        <div>
          <h1 className={styles.title}>Cart</h1>

          <div className={styles.content}>
            <div className={styles.listWrapper}>

              {cartItemsList}
            </div>

            <div className={styles.total}>
              <div className={styles.sum}>
                <h2 className={styles.totalName}>{`$${totalSum}`}</h2>
              </div>

              <div className={styles.checkout}>

                <button
                  type="button"
                  className={'PrimaryButton'}
                  onClick={() => (console.log('Thanks for order, we will call you later... '))}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className={styles.title}>No items in the cart...</h1>
      )}
    </>
  )
}

export default CartPage