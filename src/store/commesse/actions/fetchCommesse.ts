import { createAsyncThunk} from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/Helpers";
import { API, BASE, COMMESSE, V1 } from "../../../utils/constants";
import { QueryParams } from "../types";

export const fetchCommesse = createAsyncThunk(
   'fecth/jobs', 
   async(params?: QueryParams): Promise<any>=>{
      try{
         const response = await apiClient.get({ url: `${BASE}${API}${V1}${COMMESSE}`, params })
      if(response.ok) {
         return response.data
      }
   }
   catch(error){
      console.log(error);
   } 
})
