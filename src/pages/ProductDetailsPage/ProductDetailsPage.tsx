import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductDetails } from '../../api';
import { Product, PropertyByCategory } from '../../App';
import BackButton from '../../components/BackButton/BackButton';
import ImagesBlock from '../../components/ImagesBlock/ImagesBlock';
import ProductsSlider from '../../components/ProductsSlider/ProductsSlider';
import SectionNav from '../../components/SectionNav/SectionNav';
import TechSpecs from '../../components/TechSpecs/TechSpecs';
import styles from './ProductDetailsPage.module.scss';


// import styles from './ProductsSlider.module.scss';

// import { Android } from './Android';
// import { Battery } from './Battery';
// import { Camera } from './Camera';
// import { Connectivity } from './Connectivity';
// import { Display } from './Display';
// import { Hardware } from './Hardware';
// import { SizeAndWeight } from './SizeAndWeight';
// import { Storage } from './Storage';

interface Android {
  os: string;
  ui: string;
}

interface Battery {
  standbyTime: string;
  talkTime: string;
  type: string;
}

interface Camera {
  features: string[];
  primary: string;
}

interface Connectivity {
  bluetooth: string;
  cell: string;
  gps: boolean;
  infrared: boolean;
  wifi: string;
}

interface Display {
  screenResolution: string;
  screenSize: string;
  touchScreen: boolean;
}

interface Hardware {
  accelerometer: boolean;
  audioJack: string;
  cpu: string;
  fmRadio: boolean;
  physicalKeyboard: boolean
  usb: string;
}

interface SizeAndWeight {
  dimensions: string[];
  weight: string;
}

interface Storage {
  flash: string;
  ram: string;
}

 interface ProductDetails {
  additionalFeatures: string;
  android: Android;
  availability: string[];
  battery: Battery;
  camera: Camera;
  connectivity: Connectivity;
  description: string;
  display: Display;
  hardware: Hardware;
  id: string;
  images: string[];
  name: string;
  sizeAndWeight: SizeAndWeight;
  storage: Storage;
}

type Props = {
  title: string;
  productList: Product[];
}

const ProductDetailsPage: React.FC<Props> = ({title, productList}) => {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
const {productId} = useParams();
console.log(productId);
console.log(productList);

const randomProducts = productList.sort(() => Math.random() - 0.5)

const currentProductData = productList.find(item => item.id === productDetails?.id)
const techSpecs = [
  { key: 'Screen', value: currentProductData?.screen },
  { key: 'Resolution', value: productDetails?.display.screenResolution },
  { key: 'Processor', value: productDetails?.hardware.cpu },
  { key: 'RAM', value: currentProductData?.ram },
  { key: 'Built in memory', value: productDetails?.storage.ram },
  { key: 'Camera', value: productDetails?.camera.primary },
  { key: 'OS', value: productDetails?.android.os },
  { key: 'Cell', value: productDetails?.connectivity.cell },
];

useEffect(() => {
  if (productId) {
 getProductDetails(productId)
    .then((res: ProductDetails) => {
       setProductDetails(res)
    })
    .catch(error => {
      console.log(error);
    })
  }
}, [productId]);

const linkTitle = title === 'Mobile phones' ? 'Phones' : title;

  return (
    <div className={styles.root}>
    {!productDetails ? (
        <h1>Details</h1>
      ) : (
        <>
        <SectionNav title={linkTitle} productName={productDetails?.name}/>

        <BackButton />
      <h1 className={styles.title}>{productDetails.name}</h1>

      <div className={styles.content}>
        <div className={styles.info}>
          <ImagesBlock images={productDetails.images} alt={productDetails.name} />

          <div className={styles.additionalInfo}>
            <div className={styles.priceBlock}>
              <span className={styles.newPrice}>
                {`$${currentProductData?.price}`}
              </span>

              {currentProductData && currentProductData.discount !== 0 ? (
                <span className={ styles.oldPrice}>
            {`$${Math.floor(
              currentProductData.price - 
              (currentProductData.price * 
              (currentProductData.discount / 100)))
              }`}
          </span>

            ) : (
              null
            )}
            </div>

            <div className={styles.cartButtons}>
              <button
                type="button"
                className={styles.addToCart}
              > Add to cart
              </button>
              <button
                type="button"
                className={styles.like}
              >
              </button>
            </div>
            <TechSpecs techSpecs={techSpecs.slice(0,4)} isTextSmall/>
          </div>
        </div>

        <div className={styles.description}>
          <div>
            <h2 className={styles.subTitle}>
              About
            </h2>

            <article>
              {productDetails.description}
            </article>
          </div>

          <div>
            <h2 className={styles.subTitle}>
              Tech specs
            </h2>

            <TechSpecs techSpecs={techSpecs} isTextSmall={false} />
          </div>
        </div>

        <ProductsSlider
          title="You may also like"
          list={randomProducts.slice(0, 8)}
        />
      </div>
      </>
      )}
    </div>
  )
}

export default ProductDetailsPage