import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, UTENTI, V1 } from "../../../utils/constants";
import { apiClient } from '../../../utils/Helpers';
import { User } from '../types';

export const createUsers = createAsyncThunk(
    'users/createUsers',
    async (user: User, thunkAPI) => {
        try {
            const response = await apiClient.post({ url: `${BASE}${API}${V1}${UTENTI}`, params: user })
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
