import { createAsyncThunk } from '@reduxjs/toolkit';
import { Customers } from '../../customers/types';
import { API, BASE, CUSTOMERS, V1 } from "../../../utils/constants";

const URL_CUSTOMERS = `${BASE}${API}${V1}${CUSTOMERS}`;

export const createCustomers = createAsyncThunk(
    'customers/createCustomers',
    async (customer: Customers, thunkAPI) => {
        try {
            const response = await fetch(URL_CUSTOMERS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer)
            });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
