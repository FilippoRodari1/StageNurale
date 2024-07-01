import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getFattureVenditaState = (state : RootState)=> state.salesInvoice
export const getFattureVenditaData = createSelector(
    getFattureVenditaState,
    (FattureVenditaState)=>FattureVenditaState.data
)
