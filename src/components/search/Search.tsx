import React from 'react';
import css from './search.module.scss';
import searchIcon from '../../assets/img/searchIcon.svg';
type Props = {};

const Search = (props: Props) => {
  return (
    <div className={css.searchContainer}>
      <input className={css.search} placeholder="Find Pizza..." />
      <img className={css.icon} src={searchIcon} alt="search" />
    </div>
  );
};

export default Search;
