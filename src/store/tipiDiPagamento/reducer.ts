import { createSlice } from "@reduxjs/toolkit";
import { fetchTypeOfPayments } from "./actions";
import { InitalStateTypeOfPayments } from "./types";
import {LOADING} from "../types"

const initialState : InitalStateTypeOfPayments = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceTypeOfPayments = createSlice({
    name: 'type-of-payments',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchTypeOfPayments.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchTypeOfPayments.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchTypeOfPayments.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})