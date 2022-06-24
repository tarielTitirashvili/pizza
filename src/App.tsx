import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';
import { SearchType } from './types';
export const SearchContext = React.createContext<SearchType>({
  search: '',
  setSearch: () => '',
});
const App = () => {
  const [search, setSearch] = React.useState<string>('');

  return (
    <SearchContext.Provider value={{ search: search, setSearch: setSearch }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>
  );
};

export default App;
