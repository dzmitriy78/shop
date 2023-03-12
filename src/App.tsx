import React from 'react';
import './scss/app.scss';
import Home from "./Pages/Home";
import {Route, Routes} from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import Cart from "./Pages/Cart";
import FullItem from "./components/FullItem/FullItem";
import Main from "./Layouts/Main";

const App: React.FC = () => {

    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Main/>}>
                    <Route path={""} element={<Home/>}/>
                    <Route path={"/cart"} element={<Cart/>}/>
                    <Route path={"/fullItem/:id"} element={<FullItem/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App
