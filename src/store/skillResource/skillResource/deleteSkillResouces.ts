import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, SKILLSRISORSE, V1 } from "../../../utils/constants";

const URL_SKILLRESOURCES = `${BASE}${API}${V1}${SKILLSRISORSE}`;

export const deleteSkillResources = createAsyncThunk(
    'resources/deleteSkillResources',
    async (id: number, thunkAPI) => {
        try {
            const response = await fetch(`${URL_SKILLRESOURCES}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
