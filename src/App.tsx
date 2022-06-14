import React from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

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

function App() {
  const [pizzas, setPizzas] = React.useState<Pizza[]>([]);
  const getData = (): void => {
    fetch('https://62a85ee7943591102ba05a2c.mockapi.io/pizzas')
      .then((data) => data.json())
      .then((data) => {
        setPizzas(data);
        console.log(data);
      });
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza: Pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
