import { FC } from 'react'
import { ProductProps } from '../../interfaces/shared'
import classes from './ProductsList.module.css'

interface ProductListProps {
  products: ProductProps[]
}

const ProductList: FC<ProductListProps> = ({
  products
}) => {
  return (
    <ul className={classes.ProductsList}>
      {products.map(product => {
        return (
          <li key={product.id} className={classes.card}>
            <h3 className={classes.title}>{product.title}</h3>
            <div>
              <span className={classes.price}>USD {product.price}</span>
              <span> - stock: {product.stock}</span>
            </div>
            <p>{product.description}</p>
          </li>
        ) 
      })}
    </ul>
  )
}

export default ProductList
