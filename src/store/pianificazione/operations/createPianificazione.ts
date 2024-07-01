import { createAsyncThunk } from '@reduxjs/toolkit';

import { API, BASE, PIANIFICAZIONE, V1 } from '../../../utils/constants';
import { Pianificazione } from '../types';
import { apiClient } from '../../../utils/Helpers';

export const createPianificazione = createAsyncThunk(
    'scheduled-values/createScheduled-values',
    async (pianificazione: Pianificazione, thunkAPI) => {
        try {
            const response = await apiClient.post({ url: `${BASE}${API}${V1}${PIANIFICAZIONE}`, params: pianificazione })
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
