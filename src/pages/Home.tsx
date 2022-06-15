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

const Home = (props: Props) => {
  const [pizzas, setPizzas] = React.useState<Pizza[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const getData = (): void => {
    fetch('https://62a85ee7943591102ba05a2c.mockapi.io/pizzas')
      .then((data) => data.json())
      .then((data) => {
        setPizzas(data);
        setLoading(false);
        console.log(data);
      });
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((elem, i) => <Skeleton key={i} />)
          : pizzas.map((pizza: Pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </>
  );
};

export default Home;