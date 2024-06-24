import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/Helpers";
import { API, ATTIVITA, BASE, V1 } from "../../../utils/constants";
import { QueryParams } from "../types";


export const fetchAttività = createAsyncThunk(
   'fecth/activities', 
   async(params?: QueryParams): Promise<any>=>{
      try{
         const response = await apiClient.get({ url: `${BASE}${API}${V1}${ATTIVITA}`, params })
      if(response.ok) {
         return response.data
      }
   }
   catch(error){
      console.log(error);
   } 
})