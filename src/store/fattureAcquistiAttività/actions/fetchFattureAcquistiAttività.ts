import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/Helpers";
import { API, BASE, FATTURADIACQUISTOATTIVITA, V1 } from "../../../utils/constants";
import { QueryParams } from "../types";


export const fetchFatturaAcquistiAttività = createAsyncThunk(
   'fecth/purchase-invoice-activity', 
   async(params?: QueryParams): Promise<any>=>{
      try{
         const response = await apiClient.get({ url: `${BASE}${API}${V1}${FATTURADIACQUISTOATTIVITA}`, params })
      if(response.ok) {
         return response.data
      }
   }
   catch(error){
      console.log(error);
   } 
})