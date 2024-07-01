import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, BASE, TIPIDIPAGAMENTO, V1 } from "../../../utils/constants";
import { TypeOfPayments } from '../types';
import { apiClient } from '../../../utils/Helpers';


export const createTypeOfPayments = createAsyncThunk(
    'type-of-payments/createTypeOfPayments',
    async (TypeOfPayments: TypeOfPayments, thunkAPI) => {
        try {
            const response = await apiClient.post({ url: `${BASE}${API}${V1}${TIPIDIPAGAMENTO}`, params: TypeOfPayments })
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
