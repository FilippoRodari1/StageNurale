import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getResourceState = (state : RootState)=> state.resources
export const getResourceData = createSelector(
    getResourceState,
    (ResourceState)=>ResourceState.data
)
