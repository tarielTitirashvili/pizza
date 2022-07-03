import React from 'react';
import css from './pagination.module.scss';

type Props = {
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  maxPage: number;
};

const Pagination = (props: Props) => {
  const { loading, page, setPage, maxPage } = props;
  const firstPAge = page === 1 ? page : page === maxPage ? page - 2 : page - 1;
  const secondPage = page === 1 ? page + 1 : page === maxPage ? page - 1 : page;
  const thirdPage = page === maxPage ? page : page === 1 ? page + 2 : page + 1;
  if (loading) return <></>;
  return (
    <ul className={css.container}>
      {page === 1 ? (
        <span className={css.empty}></span>
      ) : (
        <li onClick={() => setPage(page - 1)} className={css.page}>
          &lt;
        </li>
      )}

      <li onClick={() => setPage(firstPAge)} className={`${firstPAge === page && css.active}`}>
        {firstPAge}
      </li>
      <li onClick={() => setPage(secondPage)} className={`${secondPage === page && css.active}`}>
        {secondPage}
      </li>
      <li onClick={() => setPage(thirdPage)} className={`${thirdPage === page && css.active}`}>
        {thirdPage}
      </li>
      {page === maxPage || page > maxPage ? (
        ''
      ) : (
        <>
          <li onClick={() => setPage(page + 1)} className={css.page}>
            &gt;
          </li>
        </>
      )}
    </ul>
  );
};

export default Pagination;
