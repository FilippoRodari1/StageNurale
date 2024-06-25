import { createAsyncThunk } from '@reduxjs/toolkit';

import { API, BASE, ORDERS, V1 } from '../../../utils/constants';
import { Orders } from '../types';
import { apiClient } from '../../../utils/Helpers';

export const createOrders = createAsyncThunk(
    'orders/createOrders',
    async (orders: Orders, thunkAPI) => {
        try {
            const response = await apiClient.post({ url: `${BASE}${API}${V1}${ORDERS}`, params: orders })
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
