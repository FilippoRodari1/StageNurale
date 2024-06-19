import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, SUPPLIERS, V1 } from "../../../utils/constants";

const URL_SUPPLIERS = `${BASE}${API}${V1}${SUPPLIERS}`;

export const deleteSuppliers = createAsyncThunk(
    'suppliers/deleteSuppliers',
    async (id: number, thunkAPI) => {
        try {
            const response = await fetch(`${URL_SUPPLIERS}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
