import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, CUSTOMERS, V1 } from "../../../utils/constants";

const URL_CUSTOMERS = `${BASE}${API}${V1}${CUSTOMERS}`;

export const deleteCustomers = createAsyncThunk(
    'customers/deleteCustomers',
    async (id: number, thunkAPI) => {
        try {
            const response = await fetch(`${URL_CUSTOMERS}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
