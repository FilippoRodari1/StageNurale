import { createSlice } from "@reduxjs/toolkit";
import { fetchFatturaAcquisti } from "./actions";
import { InitalStatePurchaseInvoice } from "./types";
import {LOADING} from "../types"

const initialState : InitalStatePurchaseInvoice = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceFatturaAcquisti = createSlice({
    name: 'purchase-invoice',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchFatturaAcquisti.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchFatturaAcquisti.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchFatturaAcquisti.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})