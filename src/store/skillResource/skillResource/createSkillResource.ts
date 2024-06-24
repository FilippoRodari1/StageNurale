import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, SKILLSRISORSE, V1 } from "../../../utils/constants";
import { SkillResources } from '../types';

const URL_SKILLRESOURCES = `${BASE}${API}${V1}${SKILLSRISORSE}`;

export const createSkillResources = createAsyncThunk(
    'resources/createSkillResources',
    async (resource: SkillResources, thunkAPI) => {
        try {
            const response = await fetch(URL_SKILLRESOURCES, {
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
