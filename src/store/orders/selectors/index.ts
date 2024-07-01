import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getOrderState = (state : RootState)=> state.orders
export const getOrdersData = createSelector(
    getOrderState,
    (OrdersState)=>OrdersState.data
)
