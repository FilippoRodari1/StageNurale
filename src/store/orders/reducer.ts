import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders } from "./actions";
import { InitalStateOrders } from "./types";
import {LOADING} from "../types"

const initialState : InitalStateOrders = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceOrders = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchOrders.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchOrders.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})