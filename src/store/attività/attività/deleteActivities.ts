import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, ATTIVITA, BASE, V1 } from '../../../utils/constants';

const URL_ACTIVITIES = `${BASE}${API}${V1}${ATTIVITA}`;

export const deleteActivities = createAsyncThunk(
    'activities/deleteActivities',
    async (id: number, thunkAPI) => {
        try {
            const response = await fetch(`${URL_ACTIVITIES}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
