import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, SKILLSRISORSE, V1 } from "../../../utils/constants";
import { SkillResources } from '../types';
import { apiClient } from '../../../utils/Helpers';

export const createSkillResources = createAsyncThunk(
    'resources/createSkillResources',
    async (resource: SkillResources, thunkAPI) => {
        try {
            const response = await apiClient.post({ url: `${BASE}${API}${V1}${SKILLSRISORSE}`, params: resource })
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
