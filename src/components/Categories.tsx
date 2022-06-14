import React from 'react';

type Props = {};
const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');

  const onClickNewCategory = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, name: string) => {
    setSelectedCategory(name);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            onClick={(e) => onClickNewCategory(e, category)}
            className={selectedCategory === category ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
