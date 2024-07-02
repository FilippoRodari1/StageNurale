import { createSlice } from "@reduxjs/toolkit";
import { fetchSkill} from "./actions/fetchSkill";
import { InitalStateSkills } from "./types";
import {LOADING} from "../types"

const initialState : InitalStateSkills = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceSkills = createSlice({
    name: 'skills',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchSkill.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchSkill.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchSkill.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})