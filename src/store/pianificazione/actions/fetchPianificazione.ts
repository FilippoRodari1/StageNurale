import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/Helpers";
import { API, BASE, PIANIFICAZIONE, V1 } from "../../../utils/constants";
import { QueryParams } from "../../pianificazione/types";

export const fetchPianificazione = createAsyncThunk(
   'fecth/scheduled-values', 
   async(params?: QueryParams): Promise<any>=>{
      try{
         const response = await apiClient.get({ url: `${BASE}${API}${V1}${PIANIFICAZIONE}`, params })
      if(response.ok) {
         return response.data
      }
   }
   catch(error){
      console.log(error);
   } 
})