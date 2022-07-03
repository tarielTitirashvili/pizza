import React from 'react';
import emptyCart from '../assets/img/empty-cart.png';

const EmptyCart = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>cart is empty 😕</h2>
        <p>
          You probably haven't ordered pizzas yet.
          <br />
          To order pizzas, go to the home page.
        </p>
        <img src={emptyCart} alt="Empty cart" />
        <a href="/" className="button button--black">
          <span> Go Back</span>
        </a>
      </div>
    </div>
  );
};

export default EmptyCart;
