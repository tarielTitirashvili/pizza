import React from 'react';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/pagination/Pagination';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/pizzaBlock/skeleton';
import Sort from '../components/Sort';
import { sortTypes } from '../constants';
import { SortType } from '../types';

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
  const [selectedCategory, setSelectedCategory] = React.useState<number>(0);
  const [selectedType, setSelectedType] = React.useState<number>(0);
  const selectedSortType: SortType = sortTypes[selectedType];
  const [page, setPAge] = React.useState<number>(1);
  const { search } = React.useContext(SearchContext);

  const skeletons = [...new Array(6)].map((elem, i) => <Skeleton key={i} />);
  const allPizzas = pizzas.map((pizza: Pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  const getData = (
    page: number,
    selectedCategory?: number,
    selectedType?: SortType,
  ): void => {
    setLoading(true);
    fetch(
      `https://62a85ee7943591102ba05a2c.mockapi.io/pizzas?${`${
        selectedCategory ? `category=${selectedCategory}&` : ''
      }`}page=${page}&limit=4&sortBy=${selectedType?.sortType}&order=${
        selectedType?.order
      }${search && `&title=${search}`}`,
    )
      .then((data) => data.json())
      .then((data) => {
        setPizzas(data);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getData(page);
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    getData(page, selectedCategory, selectedSortType);
  }, [selectedCategory, selectedSortType, search, page]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          selectedCategory={selectedCategory}
          onClickNewCategory={setSelectedCategory}
        />
        <Sort
          selectedSortType={selectedSortType.title}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">{loading ? skeletons : allPizzas}</div>
      <Pagination loading={loading} page={page} setPage={setPAge} maxPage={3} />
    </div>
  );
};

export default Home;
