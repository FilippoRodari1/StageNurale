import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, SCADENZE, V1 } from "../../../utils/constants";
import { apiClient } from '../../../utils/Helpers';


export const deleteScadenze = createAsyncThunk(
    'scheduled-payments/deleteScheduled-payments',
    async (id: number, thunkAPI) => {
        try {
            const response = await apiClient.delete({ url: `${BASE}${API}${V1}${SCADENZE}/${id}`});
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
