import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, COMMESSE, V1 } from '../../../../utils/constants';

const URL_JOBS = `${BASE}${API}${V1}${COMMESSE}`;

export const deleteJobs = createAsyncThunk(
    'jobs/deleteJobs',
    async (id: number, thunkAPI) => {
        try {
            const response = await fetch(`${URL_JOBS}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
