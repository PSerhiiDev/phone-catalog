import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import _debounce from 'lodash/debounce';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const location = useLocation().pathname.slice(1);
  const navigate = useNavigate();

  const clearHandler = () => {
    setQuery('');
    searchParams.delete('query')

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const applyQuery = useCallback(
    _debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery.toLowerCase())
      } else {
        clearHandler()
      }

      navigate(`?${searchParams.toString()}`);
    }, 500),
    [location]
  )

  const queryHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery((event.target.value).trimStart());
    applyQuery((event.target.value).trimStart())
  }

  const removeQuery = () => {
    setQuery('');
    clearHandler();

    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    setQuery('');
    clearHandler();
  }, [location]);

  return (
    <div className={styles.root}>
      <input
        value={query}
        onChange={queryHandler}
        type="text"
        placeholder={`Search in ${location}...`}
        ref={inputRef}
      />

      {query ? (
        <svg onClick={removeQuery} className={styles.clearIcon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        </svg>
      ) : (
        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      )}
    </div>
  )
}

export default Search;