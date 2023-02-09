import React, { Suspense } from 'react';
import Loadable from 'react-loadable';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
//import FullPizza from "./pages/FullPizza";
import MainLayout from './layouts/MainLayout';

//const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))

const Cart = Loadable({
    loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
    loading: () => <div>Идёт загрузка корзины...</div>,
});

const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
    return (
        //<div className="wrapper">
        //    <Header/>
        //    <div className="content">
        //      <div className="container">
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route
                    path="/cart"
                    element={
                        <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
                            <Cart />
                        </Suspense>
                    }
                />
                <Route
                    path="/pizza/:id"
                    element={
                        <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
                            <FullPizza />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
                            <NotFound />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
        //        </div>
        //      </div>
        //</div>
    );
}

export default App;
