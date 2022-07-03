import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './NotFoundBlock.module.scss';
import pizza from '../../assets/img/pizza-svgrepo-com.svg';

const NotFoundBlock = () => {
  return (
    <div>
      <h2 className={css.root}> PAGE NOT FOUND</h2>
      <h1 className={css.root}>
        4<img className={css.pizza} src={pizza} alt="pizza" />4 ERROR
      </h1>
      <div className={css.root}>
        <div className={css.button__container}>
          <NavLink className="button button--cart" to={'/'}>
            GO TO HOME
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NotFoundBlock;
