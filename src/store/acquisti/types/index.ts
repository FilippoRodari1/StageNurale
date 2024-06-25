import { LOADING } from "../../types";

export interface QueryParams {
    supplierId?: number;
}

export interface PurchaseInvoice {
        id: number;
        state: string;
        note: string;
        supplierId: number;
        supplier : {
            id: number;
            name: string;
        }
        operationDate: string; 
        code: string;
        netValue: number;
        vatValue: number;
        grossValue: number;
        scheduledValueId: number;
        valueCategory: string;
        typeOfPaymentId: number;
        typeOfPayment:{
            name: string;
        }
        quantity: number;
        value: number;
}
    

export interface InitalStatePurchaseInvoice{
    data: PurchaseInvoice[],
    loading: LOADING,
    error: null | string;
}
