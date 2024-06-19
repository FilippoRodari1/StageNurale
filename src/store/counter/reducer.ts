import { createSlice } from "@reduxjs/toolkit";
import { setCounter } from "./action";

export const sliceCounter = createSlice({
    name: 'Counter',
    initialState: 0,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(setCounter, (_, {payload})=>{
            return payload
        })
    }
})
