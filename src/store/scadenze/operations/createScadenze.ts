import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, SCADENZE, V1 } from "../../../utils/constants";
import { apiClient } from '../../../utils/Helpers';
import { Scadenze } from '../types';


export const createScadenze = createAsyncThunk(
    'scheduled-payments/createScheduled-payments',
    async (scadenze: Scadenze, thunkAPI) => {
        try {
            const response = await apiClient.post({ url: `${BASE}${API}${V1}${SCADENZE}`, params: scadenze })
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
