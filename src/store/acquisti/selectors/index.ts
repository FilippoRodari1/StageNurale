import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getFattureAcquistiState = (state : RootState)=> state.purchaseInvoice

export const getFattureAcquistiData = createSelector(
    getFattureAcquistiState,
    (FattureAcquistiState)=>FattureAcquistiState.data
)
