import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getTimesheetState = (state : RootState)=> state.timesheet
export const TimesheetData = createSelector(
    getTimesheetState,
    (TimesheetState)=>TimesheetState.data
)
