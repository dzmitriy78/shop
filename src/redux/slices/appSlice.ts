import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ItemType} from "../../components/ItemBlock/ItemBlock";
import axios from "axios";

export const getItems = createAsyncThunk("app/fetch",
    async (arg: { sort: string, category: string, order: string, page: number }, thunkAPI) => {
        try {
            const {data} = await axios.get<ItemType[]>(`https://63ea74ede0ac9368d6525c20.mockapi.io/shop-items?sortBy=${arg.sort}&category=${arg.category}&order=${arg.order}&page=${arg.page}&limit=8 `)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(null)
        }
    })

const appSlice = createSlice({
    name: "App",
    initialState: {
        items: [],
        isFetching: "idle"
    } as initialStateType,
    reducers: {
        fetching: (state, action: PayloadAction<{ isFetching: "idle" | "loading" | "success" | "error" }>) => {
            state.isFetching = action.payload.isFetching
        },
        setItems: (state, action) => {
            state.items = action.payload.items
        }
    },
    extraReducers: builder => {
        builder.addCase(getItems.pending, (state) => {
            state.items = []
            state.isFetching = "loading"
        })
        builder.addCase(getItems.fulfilled, (state, action: PayloadAction<ItemType[]>) => {
            state.items = action.payload
            state.isFetching = "success"
        })
        builder.addCase(getItems.rejected, (state) => {
            state.isFetching = "error"
            state.items = []
        })
    }
})

export const selectItems = (state: { app: { items: ItemType[] }; }) => state.app.items

export const {fetching, setItems} = appSlice.actions


export default appSlice.reducer

type initialStateType = {
    items: ItemType[],
    isFetching: "idle" | "loading" | "success" | "error"
}