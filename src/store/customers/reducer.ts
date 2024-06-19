import { createSlice } from "@reduxjs/toolkit";
import { fetchCustomers } from "./actions";
import { InitalStateCustomers } from "./types";
import {LOADING} from "../types"

const initialState : InitalStateCustomers = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceCustomers = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchCustomers.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchCustomers.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchCustomers.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})