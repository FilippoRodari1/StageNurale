import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, RESOURCES, V1 } from "../../../utils/constants";

const URL_RESOURCES = `${BASE}${API}${V1}${RESOURCES}`;

export const deletResources = createAsyncThunk(
    'resources/deleteResources',
    async (id: number, thunkAPI) => {
        try {
            const response = await fetch(`${URL_RESOURCES}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
