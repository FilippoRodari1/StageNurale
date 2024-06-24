import { createAsyncThunk } from '@reduxjs/toolkit';

import { API, BASE, COMMESSE, V1 } from '../../../../utils/constants';
import { Jobs } from '../../types';

const URL_JOBS = `${BASE}${API}${V1}${COMMESSE}`;

export const createJobs = createAsyncThunk(
    'jobs/createJobs',
    async (jobs: Jobs, thunkAPI) => {
        try {
            const response = await fetch(URL_JOBS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jobs)
            });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
