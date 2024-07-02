import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getScadenzeState = (state : RootState)=> state.scadenze
export const getScadenzeData = createSelector(
    getScadenzeState,
    (ScadenzeState)=>ScadenzeState.data
)
