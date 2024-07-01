import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getCommessaState = (state : RootState)=> state.commesse

export const getCommessaData = createSelector(
    getCommessaState,
    (CommessaState)=>CommessaState.data
)
