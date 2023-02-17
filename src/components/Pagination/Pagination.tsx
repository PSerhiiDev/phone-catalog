import clsx from 'clsx';
import React from 'react'
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

interface Props {

  pageCount: number
  //  handlePageClick: (selected: number) => void;
  handlePageClick: ({ selected }: { selected: number }) => void;

}

const Pagination: React.FC<Props> = ({ pageCount, handlePageClick }) => {

  return (


    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2} // 1 2...8 9
      pageRangeDisplayed={2} // ... 5 6 ...
      onPageChange={handlePageClick}
      containerClassName={styles.pagination} // ul style
      pageClassName={styles.pageItem} // li style pages
      pageLinkClassName={styles['page-link']} // a style inside li
      previousClassName={styles.pageItem} // < btn styles
      previousLinkClassName={styles['page-link']}
      nextClassName={styles.pageItem}
      nextLinkClassName={styles['page-link']}
      // breakClassName={'page-item'} // style ...
      // breakLinkClassName={'page-link'}
      activeClassName={styles.active} // selected btn
    />
  )
}

export default Pagination