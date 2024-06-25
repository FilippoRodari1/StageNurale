import { createAsyncThunk } from '@reduxjs/toolkit';

import { API, BASE, COMMESSE, V1 } from '../../../../utils/constants';
import { Jobs } from '../../types';
import { apiClient } from '../../../../utils/Helpers';

export const createJobs = createAsyncThunk(
    'jobs/createJobs',
    async (jobs: Jobs, thunkAPI) => {
        try {
            const response = await apiClient.post({ url: `${BASE}${API}${V1}${COMMESSE}`, params: jobs })
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
