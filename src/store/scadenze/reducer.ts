import { createSlice } from "@reduxjs/toolkit";
import { InitalStateScadenze } from "./types";
import {LOADING} from "../types"
import { fetchScadenze } from "./actions";

const initialState : InitalStateScadenze = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceScadenze = createSlice({
    name: 'scheduled-payments',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchScadenze.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchScadenze.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchScadenze.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})