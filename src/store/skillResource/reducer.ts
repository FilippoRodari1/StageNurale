import { createSlice } from "@reduxjs/toolkit";
import { fetchSkillResource } from "./actions/fetchSkillResource";
import { InitalStateSkillResources } from "./types";
import {LOADING} from "../types"

const initialState : InitalStateSkillResources = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceSkillsResources = createSlice({
    name: 'resource-skills',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchSkillResource.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchSkillResource.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchSkillResource.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})