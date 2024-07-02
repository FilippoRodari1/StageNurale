import { LOADING } from "../../types";

export interface QueryParams {
    purchasesInvoiceId?: number;
}

export interface Scadenze {
    id: number
    purchasesInvoiceId : number
    purchasesInvoice : {
        name: string;
    }
    salesInvoiceId : number
    grossValue : number
    scheduledDate : string
    paymentDate : string
    note : string
}

export interface InitalStateScadenze{
    data: Scadenze[],
    loading: LOADING,
    error: null | string;
}

