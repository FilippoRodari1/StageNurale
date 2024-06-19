import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, SUPPLIERS, V1 } from "../../../utils/constants";
import { Suppliers } from '../../suppliers/types';

const URL_SUPPLIERS = `${BASE}${API}${V1}${SUPPLIERS}`;

export const createSuppliers = createAsyncThunk(
    'customers/createCustomers',
    async (supplier: Suppliers, thunkAPI) => {
        try {
            const response = await fetch(URL_SUPPLIERS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(supplier)
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
