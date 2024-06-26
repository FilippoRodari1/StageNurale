import { LOADING } from "../../types";

export interface QueryParams {
    activityId?: number;
}

export interface PurchaseInvoiceActivity {
        id: number;
        purchasesInvoiceId: number;
        activityId : number;
        orderId : number;
        jobId : number;
        resourceId : number;
        quantity : number;
        value: number;
}
    

export interface InitalStatePurchaseInvoiceActivity{
    data: PurchaseInvoiceActivity[],
    loading: LOADING,
    error: null | string;
}
