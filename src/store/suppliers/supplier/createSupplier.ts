import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, SUPPLIERS, V1 } from "../../../utils/constants";
import { Suppliers } from '../types';
import { apiClient } from '../../../utils/Helpers';


export const createSuppliers = createAsyncThunk(
    'suppliers/createSuppliers',
    async (supplier: Suppliers, thunkAPI) => {
        try {
            const response = await apiClient.post({ url: `${BASE}${API}${V1}${SUPPLIERS}`, params: supplier })
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
