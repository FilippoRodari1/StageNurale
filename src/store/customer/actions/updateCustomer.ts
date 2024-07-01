import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../../utils/Helpers';
import { Customers } from '../../customers/types';
import { BASE, API, V1, CUSTOMERS } from '../../../utils/constants';



export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async ({ id, updatedCustomer }: { id: number, updatedCustomer: Customers }, thunkAPI) => {
        try {
            const response = await apiClient.put({ url: `${BASE}${API}${V1}${CUSTOMERS}/${id}`, params: updatedCustomer });
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
