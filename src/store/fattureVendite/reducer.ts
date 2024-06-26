import { createSlice } from "@reduxjs/toolkit";
import { InitalStateSalesInvoice } from "./types";
import {LOADING} from "../types"
import { fetchFattureVendita } from "./actions/fetchFattureVendita";

const initialState : InitalStateSalesInvoice = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceFattureVendita = createSlice({
    name: 'sales-invoice',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchFattureVendita.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchFattureVendita.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchFattureVendita.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})