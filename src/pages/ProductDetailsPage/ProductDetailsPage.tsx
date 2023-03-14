import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../api';
import BackButton from '../../components/BackButton/BackButton';
import CardButtons from '../../components/CardButtons/CardButtons';
import ImagesBlock from '../../components/ImagesBlock/ImagesBlock';
import ProductsSlider from '../../components/ProductsSlider/ProductsSlider';
import SectionNav from '../../components/SectionNav/SectionNav';
import TechSpecs from '../../components/TechSpecs/TechSpecs';
import { Product, ProductDetails } from '../../types';
import styles from './ProductDetailsPage.module.scss';

type Props = {
  title: string;
  productList: Product[];
}

const ProductDetailsPage: React.FC<Props> = ({ title, productList }) => {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const { productId } = useParams();

  const randomProducts = productList.sort(() => Math.random() - 0.5)

  const currentProductData = productList.find(item => item.id === productDetails?.id);
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
          <SectionNav title={linkTitle} productName={productDetails?.name} />

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
                    <span className={styles.oldPrice}>
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
                  <CardButtons id={currentProductData?.id as string} imageUrl={currentProductData?.imageUrl as string} name={currentProductData?.name as string} />
                </div>
                <TechSpecs techSpecs={techSpecs.slice(0, 4)} isTextSmall />
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