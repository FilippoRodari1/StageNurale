import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, ORDERS, V1 } from '../../../utils/constants';


const URL_ORDERS = `${BASE}${API}${V1}${ORDERS}`;

export const deleteOrders = createAsyncThunk(
    'orders/deleteOrders',
    async (id: number, thunkAPI) => {
        try {
            const response = await fetch(`${URL_ORDERS}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
