import { createSlice } from "@reduxjs/toolkit";
import { fetchSuppliers } from "./actions";
import { InitalStateSuppliers } from "./types";
import {LOADING} from "../types"

const initialState : InitalStateSuppliers = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceSuppliers = createSlice({
    name: 'supplier',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchSuppliers.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchSuppliers.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchSuppliers.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})