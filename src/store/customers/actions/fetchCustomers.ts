import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/Helpers";
import { API, BASE, CUSTOMERS, V1 } from "../../../utils/constants";
import { QueryParams } from "../types";

export const fetchCustomers = createAsyncThunk(
   'fecth/customers', 
   async(params?: QueryParams): Promise<any>=>{
      try{
         const response = await apiClient.get({ url: `${BASE}${API}${V1}${CUSTOMERS}`, params })
      if(response.ok) {
         return response.data
      }
   }
   catch(error){
      console.log(error);
   } 
})