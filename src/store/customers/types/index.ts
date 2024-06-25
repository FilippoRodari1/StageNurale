import { LOADING } from "../../types";

export interface QueryParams {
    typeOfPaymentId?: number;
}

export interface Customers {
    id: number;
    name: string;
    typeOfPaymentId: number;
    typeOfPayment:{
        id: number;
        name: string;
    }
    note: string;
}

export interface InitalStateCustomers{
    data: Customers[],
    loading: LOADING,
    error: null | string;
}
