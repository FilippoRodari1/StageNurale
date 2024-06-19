import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/Helpers";
import { API, BASE, SUPPLIERS, V1 } from "../../../utils/constants";
import { QueryParams } from "../types";


export const fetchSuppliers = createAsyncThunk(
   'fecth/suppliers', 
   async(params?: QueryParams): Promise<any>=>{
      try{
         const response = await apiClient.get({ url: `${BASE}${API}${V1}${SUPPLIERS}`, params })
      if(response.ok) {
         return response.data
      }
   }
   catch(error){
      console.log(error);
   } 
})