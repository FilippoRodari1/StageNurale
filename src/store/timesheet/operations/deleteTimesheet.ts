import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, TIMESHEET, V1 } from "../../../utils/constants";
import { apiClient } from '../../../utils/Helpers';


export const deleteTimesheet = createAsyncThunk(
    'timesheet/deleteTimesheet',
    async (id: number, thunkAPI) => {
        try {
            const response = await apiClient.delete({ url: `${BASE}${API}${V1}${TIMESHEET}/${id}`});
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