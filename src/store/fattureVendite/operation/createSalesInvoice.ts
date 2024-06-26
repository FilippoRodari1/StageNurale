import { createAsyncThunk } from '@reduxjs/toolkit';
import { SalesInvoice } from '../types';
import { API, BASE, FATTUREVENDITA, V1 } from '../../../utils/constants';
import { apiClient } from '../../../utils/Helpers';


export const createFattureVendita = createAsyncThunk(
    'sales-invoice/createSalesInvoice',
    async (fattureVendita: SalesInvoice, thunkAPI) => {
        try {
            const response = await apiClient.post({url: `${BASE}${API}${V1}${FATTUREVENDITA}`, params: fattureVendita });
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
