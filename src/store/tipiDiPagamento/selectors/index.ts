import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getTypeOfPaymentsState = (state : RootState)=> state.typeOfPayments
export const getTypeOfPaymentsData = createSelector(
    getTypeOfPaymentsState,
    (TypeOfPaymentsState)=>TypeOfPaymentsState.data
)
