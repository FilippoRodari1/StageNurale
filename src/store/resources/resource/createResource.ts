import { createAsyncThunk } from '@reduxjs/toolkit';
import { Resources } from '../../resources/types';
import { API, BASE, RESOURCES, V1 } from "../../../utils/constants";
import { apiClient } from '../../../utils/Helpers';


export const createResources = createAsyncThunk(
    'resources/createResources',
    async (resource: Resources, thunkAPI) => {
        try {
            const response = await apiClient.post({ url: `${BASE}${API}${V1}${RESOURCES}`, params: resource })
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
