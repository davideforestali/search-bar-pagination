import { FC, MouseEvent, useEffect, useState } from 'react'
import classes from './Pagination.module.css'

interface PaginationProps {
    totalItems: number
    itemsPerPage: number
    onPaginate: (currentPage: number) => void
}

const Pagination: FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    onPaginate
}) => {
    const [start, setStart] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    
    const totalPages = Math.ceil(totalItems/itemsPerPage)
    const pages = []
    
    for( let i = 0; i < totalPages; i++ ) pages[i] = i+1
    
    const currentPages = pages.splice(start, 5)
    
    const pageClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const { textContent: value } = e.target as HTMLButtonElement
      value && setCurrentPage(parseInt(value))
    }
    
    useEffect(() => {
      // if( currentPages.length < 1 ) return
      const currentPageIndex = currentPages.indexOf(currentPage)
      
      if (currentPageIndex > 3) {
        if( currentPages.pop() !== totalPages ) setStart(start+1)
      }
      
      if (currentPageIndex < 1 && currentPages.shift() !== 1) setStart(start-1)

      onPaginate(currentPage)      
    }, [currentPage, currentPages, onPaginate, start, totalPages])
    
    return (
      <div className={classes.Pagination}>
        <ul className={classes.lister}>
          <li aria-label='Previous page'>
            <button
              className={`${currentPage === 1 && classes.disabled}`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage-1)}
          >
                &#60;
          </button>
          </li>
          {currentPages.map((page, key) => (
            <li key={key}>
              <button
                className={`${page === currentPage && classes.active}`}
                onClick={pageClickHandler}
              >
                  {page}
              </button>
            </li>
          ))}
          <li aria-label='Next page'>
            <button
              className={`${currentPage === totalPages && classes.disabled}`}
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage+1)}
          >
              &#62;
          </button>
          </li>
        </ul>
      </div>
    )
  }
  
export default Pagination