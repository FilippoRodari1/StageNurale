import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./actions";
import { InitalStateUser} from "./types";
import {LOADING} from "../types"

const initialState : InitalStateUser = {
    data:[],
    loading: LOADING.IDLE,
    error: null
}

export const sliceUsers = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = LOADING.SUCCEEDED
            state.error = null
        }).addCase(fetchUsers.pending, (state) => {
            state.loading = LOADING.PENDING
            
        }).addCase(fetchUsers.rejected, (state, action) => {
            state.error = action.payload as string
            
        })
    }
})