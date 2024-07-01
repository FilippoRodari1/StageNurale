import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getUserState = (state : RootState)=> state.user

export const getUserData = createSelector(
    getUserState,
    (userState)=>userState.data
)
