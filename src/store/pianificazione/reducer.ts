import { createSlice } from "@reduxjs/toolkit";
import { fetchPianificazione } from "./actions";
import { InitalStatePianificazione } from "./types";
import {LOADING} from "../types"

const initialState : InitalStatePianificazione = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const slicePianificazione = createSlice({
    name: 'scheduled-values',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchPianificazione.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchPianificazione.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchPianificazione.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})