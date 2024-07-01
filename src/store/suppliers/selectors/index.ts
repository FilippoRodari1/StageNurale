import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getSuppliersState = (state : RootState)=> state.suppliers
export const SuppliersData = createSelector(
    getSuppliersState,
    (SuppliersState)=>SuppliersState.data
)
