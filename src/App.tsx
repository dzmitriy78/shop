import React from 'react';
import './scss/app.scss';
import Home from "./Pages/Home";
import {Navigate, Route, Routes} from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import Cart from "./Pages/Cart";

const App: React.FC = () => {

    return (
        <div className="App">
                <Routes>
                    <Route path={"/"} element={<Navigate to={"/home"}/>}/>
                    <Route path={"/home"} element={<Home/>}/>
                    <Route path={"/cart"} element={<Cart/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
        </div>
    )
}

export default App;
