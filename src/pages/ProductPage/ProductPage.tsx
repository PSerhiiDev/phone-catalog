import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Product, SearchContext } from '../../App';
import NotFound from '../../components/NotFoundBlock/NotFound';
import PageEmpty from '../../components/PageEmpty/PageEmpty';
import Pagination from '../../components/Pagination/Pagination';
import ProductCard from '../../components/ProductCard/ProductCard';
import _debounce from 'lodash/debounce';
import SelectBlock from '../../components/SelectBlock/SelectBlock';
import ProductsList from '../../components/ProductsList/ProductsList';
import { MultiValue, SingleValue } from "react-select";
import isNull from "lodash/isNull";
import styles from './ProductPage.module.scss';
import SectionNav from '../../components/SectionNav/SectionNav';

type PaginatePage = {
  selected: number
}

type Props = {
  productInfo: Product[];
  title: string;
}

interface OptionsList {
  value: string,
  label: string,
}

type IsMulti = false;

const sortItems = ['Newest', 'Alphabetically', 'Cheapest'];
const perPageItems = ['4', '8', '16', 'All'];

const ProductPage: React.FC<Props> = ({ productInfo, title }) => {
  const { searchValue } = useContext(SearchContext);
  const navigate = useNavigate();

  const linkTitle = title === 'Mobile phones' ? 'Phones' : title;

  let [searchParams, setSearchParams] = useSearchParams();
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort') || 'Newest';
  const perPage = searchParams.get('perPage') || 'All';
  const productIndex = perPage === 'All' ? productInfo?.length : +perPage;

  const endOffset = itemOffset + productIndex;

  const onChangeHandler = (event: SingleValue<OptionsList>) => {
    if (isNull(event)) return;
    const value = event.label;
    switch (value) {
      case 'Newest':
        searchParams.set('sort', value);
        productInfo.sort((a: Product, b: Product) => {
          return a.age - b.age
        })
        break;
      case 'Alphabetically':
        searchParams.set('sort', value);
        console.log(value);
        productInfo.sort((a: Product, b: Product) => {
          return a.name.localeCompare(b.name)
        })
        break;

      case 'Cheapest':

        searchParams.set('sort', value);
        productInfo.sort((a: Product, b: Product) => {

          return (a.discount !== 0 ?
            Math.floor(a.price - (a.price * (a.discount / 100))) : a.price)
            - (b.discount !== 0 ?
              Math.floor(b.price - (b.price * (b.discount / 100))) : b.price);

        })


        break;

      case 'All':
        searchParams.delete('perPage');
        break;

      default:
        searchParams.set('perPage', value);
    }
    navigate({
      search: searchParams.toString(),
    });
  };

  const visibleProducts =
    productInfo?.filter((product: Product) => product.name.toLowerCase().includes(query))
  const filteredProducts = visibleProducts?.length > 0 ?
    visibleProducts :
    productInfo;
  useEffect(() => {
    setPageCount(Math.ceil((filteredProducts?.length / productIndex)));  // 14 pages
  }, [filteredProducts, productIndex])

  const handlePageClick = (data: PaginatePage) => {
    let currentPage = data.selected + 1;
    const newOffset = (data.selected * productIndex);
    setItemOffset(newOffset)

  };

  return (
    <>
      <SectionNav title={linkTitle} />
      <h2 className="section-title">{title}</h2>
      <div className={styles.counter}>{`${productInfo?.length} models`}</div>
      <div className={styles['select-wrapper']}>
        <SelectBlock
          title="Sort by"
          items={sortItems}
          selectedItem={sortBy}
          onChangeHandler={onChangeHandler}
        />

        <SelectBlock
          title="Items on page"
          items={perPageItems}
          selectedItem={perPage}
          onChangeHandler={onChangeHandler}
        />
      </div>
      <div>

        <ProductsList products={filteredProducts?.slice(itemOffset, endOffset)} />
        {pageCount > 1 &&
          <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
        }
      </div>

    </>
  )

}

export default ProductPage