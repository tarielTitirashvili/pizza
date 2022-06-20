import React from 'react';

type Props = {
  selectedCategory: number;
  onClickNewCategory: React.Dispatch<React.SetStateAction<number>>;
};
const categories: string[] = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

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
