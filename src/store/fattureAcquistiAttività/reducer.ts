import { createSlice } from "@reduxjs/toolkit";
import { InitalStatePurchaseInvoiceActivity } from "./types";
import {LOADING} from "../types"
import { fetchFatturaAcquistiAttività } from "./actions/fetchFattureAcquistiAttività";

const initialState : InitalStatePurchaseInvoiceActivity = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceFatturaAcquistiAttività = createSlice({
    name: 'purchase-invoice',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchFatturaAcquistiAttività.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchFatturaAcquistiAttività.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchFatturaAcquistiAttività.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})