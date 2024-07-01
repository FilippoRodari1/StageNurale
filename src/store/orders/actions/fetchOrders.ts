import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/Helpers";
import { API, BASE, ORDERS, V1 } from "../../../utils/constants";
import { QueryParams } from "../../orders/types";

export const fetchOrders = createAsyncThunk(
   'fecth/orders', 
   async(params?: QueryParams): Promise<any>=>{
      try{
         const response = await apiClient.get({ url: `${BASE}${API}${V1}${ORDERS}`, params })
      if(response.ok) {
         return response.data
      }
   }
   catch(error){
      console.log(error);
   } 
})