import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/Helpers";
import { API, BASE, SCADENZE, V1 } from "../../../utils/constants";
import { QueryParams } from "../types";


export const fetchScadenze = createAsyncThunk(
   'fecth/scheduled-payments', 
   async(params?: QueryParams): Promise<any>=>{
      try{
         const response = await apiClient.get({ url: `${BASE}${API}${V1}${SCADENZE}`, params })
      if(response.ok) {
         return response.data
      }
   }
   catch(error){
      console.log(error);
   } 
})