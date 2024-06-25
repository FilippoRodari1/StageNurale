import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, FATTURADIACQUISTO, V1 } from '../../../../utils/constants';
import { PurchaseInvoice } from '../../types';

const URL_FATTUREAQUISTI = `${BASE}${API}${V1}${FATTURADIACQUISTO}`;

export const createFattureAcquisti = createAsyncThunk(
    'purchase-invoice/createPurchaseInvoice',
    async (fatturaAcquisti: PurchaseInvoice, thunkAPI) => {
        try {
            const response = await fetch(URL_FATTUREAQUISTI, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fatturaAcquisti)
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
