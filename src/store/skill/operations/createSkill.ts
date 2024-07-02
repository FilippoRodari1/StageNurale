import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, SKILLS, V1 } from "../../../utils/constants";
import { Skills } from '../types';
import { apiClient } from '../../../utils/Helpers';

export const createSkill = createAsyncThunk(
    'skills/createSkills',
    async (skill: Skills, thunkAPI) => {
        try {
            const response = await apiClient.post({ url: `${BASE}${API}${V1}${SKILLS}`, params: skill })
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
