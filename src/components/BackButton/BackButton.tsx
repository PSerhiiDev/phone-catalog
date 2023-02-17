import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';


const BackButton = () => {

  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={styles.backButton}
      onClick={() => {
        navigate(-1);
      }}
    >
      Back
    </button>
  )
}

export default BackButton