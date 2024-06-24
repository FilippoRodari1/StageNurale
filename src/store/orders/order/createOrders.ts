import { createAsyncThunk } from '@reduxjs/toolkit';

import { API, BASE, ORDERS, V1 } from '../../../utils/constants';
import { Orders } from '../types';

const URL_ORDERS = `${BASE}${API}${V1}${ORDERS}`;

export const createOrders = createAsyncThunk(
    'orders/createOrders',
    async (orders: Orders, thunkAPI) => {
        try {
            const response = await fetch(URL_ORDERS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orders)
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
