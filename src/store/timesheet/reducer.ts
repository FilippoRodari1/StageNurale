import { createSlice } from "@reduxjs/toolkit";
import { fetchTimesheet } from "./actions";
import { InitalStateTimesheet } from "./types";
import {LOADING} from "../types"

const initialState : InitalStateTimesheet = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceTimesheet = createSlice({
    name: 'timesheet',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchTimesheet.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchTimesheet.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchTimesheet.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})