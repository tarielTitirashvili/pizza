import React from 'react';
import css from './search.module.scss';
import searchIcon from '../../assets/img/searchIcon.svg';
import { useSelector } from 'react-redux';
import { setSearch } from '../../redux/slices/filter/filterSlice';
import { useDispatch } from 'react-redux';
import { selectSearch } from '../../redux/slices/filter/selectors';

const Search = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  const clear = () => {
    dispatch(setSearch(''));
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };
  return (
    <div className={css.searchContainer}>
      <input
        ref={inputRef || null}
        className={css.search}
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setSearch(e.target.value));
        }}
        placeholder="Find Pizza..."
      />
      <img className={css.icon} src={searchIcon} alt="search" />
      {search && (
        <svg
          className={css.closeIcon}
          onClick={clear}
          width="48px"
          height="48px"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg">
          <title>70 Basic icons by Xicons.co</title>
          <path
            d="M41,43a2,2,0,0,1-1.41-.59L5.62,8.44A2,2,0,0,1,8.44,5.62L42.38,39.56A2,2,0,0,1,41,43Z"
            fill="#ea802a"
          />
          <path
            d="M7,43a2,2,0,0,1-1.41-3.41L39.56,5.62a2,2,0,0,1,2.83,2.83L8.44,42.38A2,2,0,0,1,7,43Z"
            fill="#ea802a"
          />
        </svg>
      )}
    </div>
  );
};

export default Search;
