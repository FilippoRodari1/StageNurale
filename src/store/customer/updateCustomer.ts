import { createAsyncThunk } from '@reduxjs/toolkit';

import { API, BASE, CUSTOMERS, V1 } from "../../utils/constants";
import { apiClient } from '../../utils/Helpers';
import { Customers } from '../customers/types';

export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async ({ id, updatedCustomer }: { id: number, updatedCustomer: Customers }, thunkAPI) => {
        try {
            const response = await apiClient.get({ url: `${BASE}${API}${V1}${CUSTOMERS}/${id}`, params: updatedCustomer });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                message: 'È stato riscontrato un errore',
                details: `Dettagli tecnici dell'errore: ${error.message}`
            });
        }
    }
);
