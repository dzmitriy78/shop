import React from 'react';
import './scss/app.scss';
import Home from "./Pages/Home";
import {Route, Routes} from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import Cart from "./Pages/Cart";


// @ts-ignore
export const SearchContext: React.Context<{ searchValue: string, setSearchValue: (value: string) => void }> = React.createContext()
const App: React.FC = () => {

    const [searchValue, setSearchValue] = React.useState<string>("")

    return (
        <div className="App">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/cart"} element={<Cart/>}/>
                    <Route path={"*"} element={<PageNotFound/>}/>
                </Routes>
            </SearchContext.Provider>
        </div>
    )
}

export default App;
