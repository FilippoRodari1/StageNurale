import { createSlice } from "@reduxjs/toolkit";
import { fetchAttività } from "./actions";
import { InitalStateActivities } from "./types";
import {LOADING} from "../types"

const initialState : InitalStateActivities = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceAttività = createSlice({
    name: 'activities',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchAttività.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchAttività.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchAttività.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})