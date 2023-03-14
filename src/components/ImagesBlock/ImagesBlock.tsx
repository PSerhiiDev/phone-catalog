import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import styles from './ImagesBlock.module.scss';


type Props = {
  images: string[];
  alt: string
};

const ImagesBlock: React.FC<Props> = ({ images, alt }) => {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <div className={styles.wrapper}>
      <ul>
        {images.map(image => (
          <li key={image} className={styles.listItem}>
            <button
              type="button"
              className={clsx(styles.button, {
                [styles['selected-button']]: selectedImage === image
              })}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={`/${image}`}
                alt={alt}
                className={styles.image}
              />
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.mainImage}>
        <img
          src={`/${selectedImage}`}
          alt="Gadget"
          className={styles.image}
        />
      </div>
    </div>
  )
}

export default ImagesBlock