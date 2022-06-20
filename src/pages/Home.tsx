import React from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/pizzaBlock/skeleton';
import Sort from '../components/Sort';

type Props = {};

interface Pizza {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}
export const sortTypes: string[] = ['popularity', 'price', 'title'];

const Home = (props: Props) => {
  const [pizzas, setPizzas] = React.useState<Pizza[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = React.useState<number>(0);
  const [selectedType, setSelectedType] = React.useState<number>(0);
  const selectedSortType: string = sortTypes[selectedType];

  const getData = (selectedCategory?: number, selectedType?: string): void => {
    setLoading(true);
    fetch(
      `https://62a85ee7943591102ba05a2c.mockapi.io/pizzas?${`${
        selectedCategory ? `category=${selectedCategory}&` : ''
      }`}sortBy=${selectedType}&order=desc`,
    )
      .then((data) => data.json())
      .then((data) => {
        setPizzas(data);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    getData(selectedCategory, selectedSortType);
  }, [selectedCategory, selectedSortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories selectedCategory={selectedCategory} onClickNewCategory={setSelectedCategory} />
        <Sort
          selectedSortType={selectedSortType}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((elem, i) => <Skeleton key={i} />)
          : pizzas.map((pizza: Pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
