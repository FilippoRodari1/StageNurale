import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, FATTURADIACQUISTO, V1 } from '../../../../utils/constants';
import { PurchaseInvoice } from '../../types';
import { apiClient } from '../../../../utils/Helpers';


export const createFattureAcquisti = createAsyncThunk(
    'purchase-invoice/createPurchaseInvoice',
    async (fatturaAcquisti: PurchaseInvoice, thunkAPI) => {
        try {
            const response = await apiClient.post({url: `${BASE}${API}${V1}${FATTURADIACQUISTO}`, params: fatturaAcquisti });
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
