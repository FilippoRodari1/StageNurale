import { createAsyncThunk } from '@reduxjs/toolkit';

import { API, ATTIVITA, BASE, V1 } from '../../../utils/constants';
import { Activities } from '../types';
import { apiClient } from '../../../utils/Helpers';

export const createActivities = createAsyncThunk(
    'activities/createActivities',
    async (attività: Activities, thunkAPI) => {
        try {
            const response = await apiClient.post({ url: `${BASE}${API}${V1}${ATTIVITA}`, params: attività })
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
