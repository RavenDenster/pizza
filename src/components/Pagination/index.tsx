import React from 'react'
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate' 
import { useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filter/selectors';


type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  
  const { categoryId } = useSelector(selectFilter)
  
  return (
    <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={e => onChangePage(e.selected + 1)} // categoryId == 0 ? e => onChangePage(e.selected + 1) : onChangePage(0)
            pageRangeDisplayed={4}
            pageCount={categoryId == 0 ? 3 : 1}
            forcePage={currentPage - 1}
            //renderOnZeroPageCount={null}
          />
  )
}

export default Pagination
