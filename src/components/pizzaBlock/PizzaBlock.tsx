import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { typeNames } from '../../constants';
import { addPizza, getTotalPriceCount } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store/store';
import { Pizza, SelectedPizza } from '../../types';

const PizzaBlock = (props: Pizza) => {
  const { price, title, imageUrl, sizes, types, id } = props;
  const [selectedType, setSelectedType] = React.useState<number>(types[0]);
  const [selectedSize, setSelectedSize] = React.useState<number>(sizes[0]);
  const inCart = useSelector((state: RootState) =>
    state.cart.pizzas.find(
      (obj) =>
        obj.id === id &&
        obj.sizes === selectedSize &&
        obj.types === selectedType,
    ),
  );
  const dispatch = useDispatch();
  const selectedPizza: SelectedPizza = {
    ...props,
    sizes: selectedSize,
    types: selectedType,
  };
  const add = () => {
    dispatch(addPizza(selectedPizza));
    dispatch(getTotalPriceCount());
  };
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt={title} />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                onClick={() => setSelectedType(type)}
                className={selectedType === type ? 'active' : ''}
                key={typeNames[type]}>
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size) => (
              <li
                key={size}
                onClick={() => setSelectedSize(size)}
                className={selectedSize === size ? 'active' : ''}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">from {price} $</div>
          <button onClick={add} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add</span>
            <i>{inCart ? inCart.quantity : 0}</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
