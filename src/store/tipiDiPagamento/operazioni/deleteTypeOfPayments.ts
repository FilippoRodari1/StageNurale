import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, TIPIDIPAGAMENTO, V1 } from "../../../utils/constants";
import { apiClient } from '../../../utils/Helpers';


export const deleteTypeOfPayments = createAsyncThunk(
    'type-of-payments/deleteTypeOfPayments',
    async (id: number, thunkAPI) => {
        try {
            const response = await apiClient.delete({ url: `${BASE}${API}${V1}${TIPIDIPAGAMENTO}/${id}`});
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
