import React from 'react';
import css from './search.module.scss';
import searchIcon from '../../assets/img/searchIcon.svg';
import { SearchContext } from '../../App';
import { SearchType } from '../../types';
type Props = {};

const Search = (props: Props) => {
  const search: SearchType = React.useContext(SearchContext);
  return (
    <div className={css.searchContainer}>
      <input
        className={css.search}
        value={search.search}
        onChange={(e) => {
          search.setSearch(e.target.value);
        }}
        placeholder="Find Pizza..."
      />
      <img className={css.icon} src={searchIcon} alt="search" />
    </div>
  );
};

export default Search;
