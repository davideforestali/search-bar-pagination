import { ChangeEvent, FC, FormEvent, useState } from 'react'
import classes from './SearchBar.module.css'

interface SearchBarProps {
  onSearchSubmit: (
    e: FormEvent<HTMLFormElement>, 
    searchInputvalue: string
  ) => void
}

const SearchBar: FC<SearchBarProps> = ({
  onSearchSubmit
}) => {
  const [searchInputvalue, setSearchInputvalue] = useState('')

  const searchInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputvalue(e.target.value)
  }

  return (
    <div className={classes.SearchBar}>
      <form
        className={`container ${classes.form}`}
        onSubmit={e => onSearchSubmit(e, searchInputvalue)}
      >
        <div className={classes.inputGroup}>
          <span className={classes.searchIcon}>🔎︎</span>
          <input
            className={classes.input}
            type='text'
            value={searchInputvalue}
            onChange={searchInputChangeHandler}
          />
        </div>
        <button type='submit' className={classes.button}>Find products</button>
      </form>
    </div>
  )
}

export default SearchBar
