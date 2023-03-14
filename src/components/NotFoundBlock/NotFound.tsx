import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
      <div >
      <h1 className={styles.root}>
        <span>😕</span>
        <br />
        Oops. Page not found...
      </h1>
      <p className={styles.description}>
        Unfortunately page not found
      </p>
    </div>
  )
}

export default NotFound