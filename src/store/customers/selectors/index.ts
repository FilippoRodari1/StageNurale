import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getCustomersState = (state : RootState)=> state.customers

export const getCustomersData = createSelector(
    getCustomersState,
    (customersState)=>customersState.data
)

export const getCusmomersById = (
    customersId : number
) => createSelector(
    getCustomersState,
    (customersState)=>customersState.data.filter(customers=> customers.id === customersId)
)


