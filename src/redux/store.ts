import {configureStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk'

import cartSlice from "./slices/cartSlice";
import appSlice from "./slices/appSlice";
import filterSlice from "./slices/filterSlice";

export const store = configureStore({
    reducer: {
        app: appSlice,
        filter: filterSlice,
        cart: cartSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch