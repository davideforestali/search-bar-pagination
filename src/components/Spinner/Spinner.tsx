import React, { FC } from 'react'
import classes from './Spinner.module.css'

const Spinner: FC = () => {
  return (
    <div
      className={classes.Spinner}
      aria-label='spinner'
    >
      Loading...
    </div>
  )
}

export default Spinner