import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, FATTURADIACQUISTO, V1 } from '../../../utils/constants';

const URL_FATTUREAQUISTI = `${BASE}${API}${V1}${FATTURADIACQUISTO}`;

export const deleteFattureAcquisti = createAsyncThunk(
    'purchase-invoice/deletePurchaseInvoice',
    async (id: number, thunkAPI) => {
        try {
            const response = await fetch(`${URL_FATTUREAQUISTI}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
