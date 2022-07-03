import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/loading/Loading';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';
// import Cart from './pages/Cart';
const Cart = React.lazy(() => import(/*webpackChunkName: "Cart"*/ './pages/Cart'));

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<Loading />}>
                <Cart />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
