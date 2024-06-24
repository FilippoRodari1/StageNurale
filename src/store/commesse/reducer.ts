import { createSlice } from "@reduxjs/toolkit";
import { fetchCommesse } from "./actions";
import { InitalStateJobs } from "./types";
import {LOADING} from "../types"

const initialState : InitalStateJobs = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceCommesse = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchCommesse.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchCommesse.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchCommesse.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})