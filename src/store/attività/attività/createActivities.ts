import { createAsyncThunk } from '@reduxjs/toolkit';

import { API, ATTIVITA, BASE, V1 } from '../../../utils/constants';
import { Activities } from '../types';

const URL_ACTIVITIES = `${BASE}${API}${V1}${ATTIVITA}`;

export const createActivities = createAsyncThunk(
    'activities/createActivities',
    async (attività: Activities, thunkAPI) => {
        try {
            const response = await fetch(URL_ACTIVITIES, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(attività)
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
