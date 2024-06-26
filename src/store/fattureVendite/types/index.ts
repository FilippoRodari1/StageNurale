import { LOADING } from "../../types";

export interface QueryParams {
    supplierId?: number;
}

export interface SalesInvoice {
    id: number;
    customerId: number; 
    customer : {
        name: string;
    }         
    typeOfPaymentId: number;
    typeOfPayment: {
        name: string;
    }     
    date: string;                
    code: string;                
    netValue: number;            
    vatValue: number;            
    grossValue: number;          
    state: string;               
    scheduledValueId: number;    
    note: string;           
}

    

export interface InitalStateSalesInvoice{
    data: SalesInvoice[],
    loading: LOADING,
    error: null | string;
}
