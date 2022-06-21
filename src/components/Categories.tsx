import React from 'react';
import { categories } from '../constants';

type Props = {
  selectedCategory: number;
  onClickNewCategory: (category: number) => void;
};

const Categories = (props: Props) => {
  const { selectedCategory, onClickNewCategory } = props;

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={category}
            onClick={() => onClickNewCategory(i)}
            className={selectedCategory === i ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
