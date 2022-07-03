import React from 'react';
import css from './loading.module.scss'
function Loading() {
  return (
    <div className={css.loadingContainer}>
      <h1>Loading...</h1>
    </div>
  );
}

export default Loading;
