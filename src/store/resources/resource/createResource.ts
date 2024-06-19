import { createAsyncThunk } from '@reduxjs/toolkit';
import { Resources } from '../../resources/types';
import { API, BASE, RESOURCES, V1 } from "../../../utils/constants";

const URL_RESOURCES = `${BASE}${API}${V1}${RESOURCES}`;

export const createResources = createAsyncThunk(
    'resources/createResources',
    async (resource: Resources, thunkAPI) => {
        try {
            const response = await fetch(URL_RESOURCES, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resource)
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
