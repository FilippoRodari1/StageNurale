import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/Helpers";
import { API, BASE, FATTUREVENDITA, V1 } from "../../../utils/constants";
import { QueryParams } from "../types";


export const fetchFattureVendita = createAsyncThunk(
   'fecth/sales-invoice', 
   async(params?: QueryParams): Promise<any>=>{
      try{
         const response = await apiClient.get({ url: `${BASE}${API}${V1}${FATTUREVENDITA}`, params })
      if(response.ok) {
         return response.data
      }
   }
   catch(error){
      console.log(error);
   } 
})