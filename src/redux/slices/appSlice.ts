import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ItemType} from "../../components/ItemBlock/ItemBlock";
import axios from "axios";
import {RootState} from "../store";

export enum Status {
    IDLE = "idle",
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}

export const getItems = createAsyncThunk<ItemType[], FetchItemsType>("app/fetch",
    async (arg, thunkAPI) => {
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
        isFetching: Status.IDLE
    } as initialStateType,
    reducers: {
        fetching: (state, action: PayloadAction<{ isFetching: Status }>) => {
            state.isFetching = action.payload.isFetching
        },
        setItems: (state, action: PayloadAction<ItemType[]>) => {
            state.items = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getItems.pending, (state) => {
            state.items = []
            state.isFetching = Status.LOADING
        })
        builder.addCase(getItems.fulfilled, (state, action: PayloadAction<ItemType[]>) => {
            state.items = action.payload
            state.isFetching = Status.SUCCESS
        })
        builder.addCase(getItems.rejected, (state) => {
            state.isFetching = Status.ERROR
            state.items = []
        })
    }
})

export const selectItems = (state: RootState) => state.app.items

export const {fetching, setItems} = appSlice.actions


export default appSlice.reducer


type initialStateType = {
    items: ItemType[],
    isFetching: Status
}
type FetchItemsType = {
    sort: string
    category: string
    order: string
    page: number
}