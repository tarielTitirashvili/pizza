import React from 'react';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/pagination/Pagination';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/pizzaBlock/skeleton';
import Sort from '../components/Sort';
import { SortType } from '../types';
import { useSelector, useDispatch } from 'react-redux';
import {
  FilterState,
  setFilters,
  setSelCategory,
  setSelectedPage,
} from '../redux/slices/filterSlice';
import { RootState } from '../redux/store/store';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { selCategory, selectedSortType, selectedType, selectedPage } =
    useSelector((state: RootState) => state.filter);

  const dispatch = useDispatch();
  const changeCategory = (category: number) => {
    dispatch(setSelCategory(category));
  };
  const setPage = (page: number) => {
    dispatch(setSelectedPage(page));
  };

  const [pizzas, setPizzas] = React.useState<Pizza[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { search, setSearch } = React.useContext(SearchContext);
  const [debouncedSearch] = useDebounce(search, 300);
  const [init, setInit] = React.useState<boolean>(true);

  const skeletons = [...new Array(6)].map((elem, i) => <Skeleton key={i} />);
  const allPizzas = pizzas.map((pizza: Pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  const getQueryParams = () => {
    const queryParams: string = window.location.search;
    if (queryParams) {
      let params = qs.parse(queryParams.slice(1));
      //{ search, selCategory, selectedPage, selectedType }
      const k = params.search ? params.search?.toString() : '';
      const category = Number(params.selCategory);
      const page = Number(params.selectedPage);
      const type = Number(params.selectedType);
      setSearch(k);
      dispatch(
        setFilters({
          selCategory: category,
          selectedPage: page,
          selectedType: type,
        }),
      );
      if (
        k === search &&
        category === selCategory &&
        selectedPage === page &&
        selectedType === type
      ) {
        setInit(false);
      }
    }
  };

  const getData = (
    page: number,
    search?: string,
    selCategory?: number,
    selectedType?: SortType,
  ): void => {
    setLoading(true);
    axios
      .get(
        `https://62a85ee7943591102ba05a2c.mockapi.io/pizzas?${`${
          selCategory ? `category=${selCategory}&` : ''
        }`}page=${page}&limit=4&sortBy=${selectedType?.sortType}&order=${
          selectedType?.order
        }${search && `&title=${search}`}`,
      )
      .then(({ data }) => {
        setPizzas(data);
        setLoading(false);
      });
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
    getQueryParams();
  }, []);

  React.useEffect(() => {
    if (!init) {
      getData(selectedPage, debouncedSearch, selCategory, selectedSortType);
    }
    if (init) {
      getQueryParams();
    }
  }, [selCategory, selectedSortType, debouncedSearch, selectedPage, init]);

  React.useEffect(() => {
    if (!init) {
      const data = qs.stringify({
        selectedType,
        selCategory,
        search,
        selectedPage,
      });
      navigate(`?${data}`);
    }
  }, [selCategory, selectedSortType, debouncedSearch, selectedPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          selectedCategory={selCategory}
          onClickNewCategory={changeCategory}
        />
        <Sort selectedSortType={selectedSortType.title} />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">{loading ? skeletons : allPizzas}</div>
      <Pagination
        loading={loading}
        page={selectedPage}
        setPage={setPage}
        maxPage={3}
      />
    </div>
  );
};

export default Home;
