import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getFattureAcquistiAttivitàState = (state : RootState)=> state.purchaseInvoiceActivity

export const getFattureAcquistiAttivitàData = createSelector(
    getFattureAcquistiAttivitàState,
    (FattureAcquistiAttivitàState)=>FattureAcquistiAttivitàState.data
)
