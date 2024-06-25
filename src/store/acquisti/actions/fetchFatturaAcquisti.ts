import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/Helpers";
import { API, BASE, FATTURADIACQUISTO, V1 } from "../../../utils/constants";
import { QueryParams } from "../types";


export const fetchFatturaAcquisti = createAsyncThunk(
   'fecth/purchase-invoice', 
   async(params?: QueryParams): Promise<any>=>{
      try{
         const response = await apiClient.get({ url: `${BASE}${API}${V1}${FATTURADIACQUISTO}`, params })
      if(response.ok) {
         return response.data
      }
   }
   catch(error){
      console.log(error);
   } 
})