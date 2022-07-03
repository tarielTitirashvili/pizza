import React from 'react';
import Categories from '../components/Categories';
import Pagination from '../components/pagination/Pagination';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/pizzaBlock/skeleton';
import Sort from '../components/Sort';
import { Pizza, SortType } from '../types';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters, setSelCategory, setSelectedPage } from '../redux/slices/filter/filterSlice';
import { AppDispatch, RootState } from '../redux/store/store';
import { useDebounce } from 'use-debounce';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/slices/pizzas/pizzasSlice';
import { selectSearch } from '../redux/slices/filter/selectors';
import { selectPizzas } from '../redux/slices/pizzas/selectors';
import { Status } from '../redux/slices/pizzas/types';

const Home = () => {
  const navigate = useNavigate();
  const { selCategory, selectedSortType, selectedType, selectedPage } = useSelector(
    (state: RootState) => state.filter,
  );
  const { pizzas, status } = useSelector(selectPizzas);
  const dispatch = useDispatch<AppDispatch>();
  const changeCategory = (category: number) => {
    dispatch(setSelCategory(category));
    dispatch(setSelectedPage(1));
  };
  const setPage = (page: number) => {
    dispatch(setSelectedPage(page));
  };
  const search = useSelector(selectSearch);
  const [debouncedSearch] = useDebounce(search, 300);
  const [init, setInit] = React.useState<boolean>(true);

  const skeletons = [...new Array(6)].map((elem, i) => <Skeleton key={i} />);
  const allPizzas = pizzas.map((pizza: Pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  const getQueryParams = () => {
    const queryParams: string = window.location.search;
    if (queryParams) {
      let params = qs.parse(queryParams.slice(1));
      const k = params.search ? params.search?.toString() : '';
      const category = Number(params.selCategory);
      const page = Number(params.selectedPage);
      const type = Number(params.selectedType);
      dispatch(
        setFilters({
          search: k,
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
    setInit(false);
  };

  const getData = async (
    page: number,
    search: string,
    selCategory: number,
    selectedType: SortType,
  ) => {
    dispatch(fetchPizzas({ search, selCategory, selectedType, selectedPage: page }));
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
        <Categories selectedCategory={selCategory} onClickNewCategory={changeCategory} />
        <Sort selectedSortType={selectedSortType.title} />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {status === Status.LOADING && skeletons}
        {status === Status.SUCCESS && allPizzas}
      </div>
      {status === Status.ERROR && (
        <div className="container container--cart">
          <div className="cart cart--empty">
            <h2> Unfortunately An error occurred while getting the pizzas try again. 😕</h2>
          </div>
        </div>
      )}
      <Pagination
        loading={status !== 'success'}
        page={selectedPage}
        setPage={setPage}
        maxPage={3}
      />
    </div>
  );
};

export default Home;
