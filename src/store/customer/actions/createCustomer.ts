import { createAsyncThunk } from '@reduxjs/toolkit';
import { Customers } from '../../customers/types';
import { API, BASE, CUSTOMERS, V1 } from "../../../utils/constants";
import { apiClient } from '../../../utils/Helpers';

export const createCustomers = createAsyncThunk(
    'customers/createCustomers',
    async (customer: Customers, thunkAPI) => {
        try {
            const response = await apiClient.post({ url: `${BASE}${API}${V1}${CUSTOMERS}`, params: customer })
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
