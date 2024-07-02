import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, TIMESHEET, V1 } from "../../../utils/constants";
import { apiClient } from '../../../utils/Helpers';
import { Timesheet } from '../types';


export const createTimesheet = createAsyncThunk(
    'timesheet/createTimesheet',
    async (timesheet: Timesheet, thunkAPI) => {
        try {
            const response = await apiClient.post({ url: `${BASE}${API}${V1}${TIMESHEET}`, params: timesheet })
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            if(response.ok) {
                return response.data
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
