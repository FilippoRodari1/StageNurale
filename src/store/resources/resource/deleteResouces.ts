import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, RESOURCES, V1 } from "../../../utils/constants";
import { apiClient } from '../../../utils/Helpers';


export const deletResources = createAsyncThunk(
    'resources/deleteResources',
    async (id: number, thunkAPI) => {
        try {
            const response = await apiClient.delete({ url: `${BASE}${API}${V1}${RESOURCES}/${id}`});
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
