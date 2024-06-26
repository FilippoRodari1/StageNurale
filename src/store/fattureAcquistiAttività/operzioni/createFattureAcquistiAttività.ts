import { createAsyncThunk } from '@reduxjs/toolkit';
import { PurchaseInvoiceActivity } from '../types';
import { API, BASE, FATTURADIACQUISTOATTIVITA, V1 } from '../../../utils/constants';
import { apiClient } from '../../../utils/Helpers';


export const createFattureAcquistiAttività = createAsyncThunk(
    'purchase-invoice/createPurchaseInvoiceActivity',
    async (fatturaAcquistiAttività: PurchaseInvoiceActivity, thunkAPI) => {
        try {
            const response = await apiClient.post({url: `${BASE}${API}${V1}${FATTURADIACQUISTOATTIVITA}`, params: fatturaAcquistiAttività });
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
