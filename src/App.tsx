import React from 'react';
import './scss/app.scss';
import Home from "./Pages/Home";
import {Route, Routes} from "react-router-dom";
import Main from "./Layouts/Main";
import {ProgressSpinner} from 'primereact/progressspinner';
import 'primeflex/primeflex.css';

const Cart = React.lazy(() => import(/*webpackChunkName: "Cart"*/"./Pages/Cart"))
const FullItem = React.lazy(() => import(/*webpackChunkName: "FullItem"*/"./components/FullItem/FullItem"))
const PageNotFound = React.lazy(() => import(/*webpackChunkName: "PageNotFound"*/"./Pages/PageNotFound"))

const App: React.FC = () => {

    return (
        <div className="App">
            <React.Suspense fallback={
                <div className="card flex justify-content-center">
                    <ProgressSpinner/>
                </div>}
            >
                <Routes>
                    <Route path={"/"} element={<Main/>}>
                        <Route path={""} element={<Home/>}/>
                        <Route path={"/cart"} element={<Cart/>}/>
                        <Route path={"/fullItem/:id"} element={<FullItem/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Route>
                </Routes>
            </React.Suspense>
        </div>
    )
}

export default App
