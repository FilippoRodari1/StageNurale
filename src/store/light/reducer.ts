import { createSlice } from "@reduxjs/toolkit";
import { setChange } from "./action";


export const sliceChange = createSlice({
    name: 'light',
    initialState: {change: false},
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(setChange, (state, action) => {
            state.change = action.payload;
        });
    }
})