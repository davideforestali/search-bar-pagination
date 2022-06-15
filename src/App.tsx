import axios from 'axios'
import { FC, FormEvent, useState } from 'react'
import Pagination from './components/Pagination/Pagination'
import ProductList from './components/ProductsList/ProductsList'
import SearchBar from './components/SearchBar/SearchBar'
import Spinner from './components/Spinner/Spinner'
import { ProductProps } from './interfaces/shared'

const networkErrorMsg = 'Something went wrong'

const App: FC = () => {
  const [products, setProducts] = useState<ProductProps[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [networkError, setNetworkError] = useState<string | null>(null)
  const [postPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  let productsToRender = <p className='h1'>Start your search</p> 
  
  const paginate = (pageNumber: number) => { 
    if (pageNumber !== currentPage) setCurrentPage(pageNumber)
  }
    
  const getProducts = (searchvalue: string) => {
    setIsLoading(true)

    axios.get('https://dummyjson.com/products')
      .then(res => {
        const products = res.data.products
        const filteredProducts = products.filter((product: ProductProps) => {
          if (searchvalue === '') return product
          else return product.title.toLowerCase()
            .includes(searchvalue.toLowerCase())
        })
        setProducts(filteredProducts)
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        setNetworkError(networkErrorMsg)
      })
  }
  
  const submitSearchHandler = (
    e: FormEvent<HTMLFormElement>,
    searchvalue: string
  ) => {
    e.preventDefault()
    getProducts(searchvalue)
  }

  if (isLoading) {
    productsToRender = <Spinner />

  } else if (networkError) {
    productsToRender = <p className='network-error-msg' aria-label='error message' role='alert'>{networkError}</p>

  } else if (products) {
    if (!products.length) {
      productsToRender = <p className='h1'>No products found</p>

    } else {
      const end = currentPage * postPerPage
      const start = end - postPerPage
      const currentProducts = products.slice(start, end)

      productsToRender = (
        <>
          <p className='h1'>{products.length} Products found</p>
          <ProductList products={currentProducts} />
          <Pagination
            totalItems={products.length}
            itemsPerPage={postPerPage}
            onPaginate={paginate}
          />
        </>
      )
    }
  } 

  return (
    <main>
      <SearchBar onSearchSubmit={submitSearchHandler} />
      <div className='container'>
        {productsToRender}
      </div>
    </main>
  )
}

export default App
