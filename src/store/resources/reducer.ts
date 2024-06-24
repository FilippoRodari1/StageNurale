import { createSlice } from "@reduxjs/toolkit";
import { InitalStateResources } from "./types";
import {LOADING} from "../types"
import { fetchResources } from "./actions";

const initialState : InitalStateResources = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceResources = createSlice({
    name: 'resources',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchResources.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchResources.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchResources.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})