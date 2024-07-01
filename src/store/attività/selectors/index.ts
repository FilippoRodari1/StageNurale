import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getAttivitàState = (state : RootState)=> state.activities

export const getAttivitàData = createSelector(
    getAttivitàState,
    (AttivitàState)=>AttivitàState.data
)
