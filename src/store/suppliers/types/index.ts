import { LOADING } from "../../types";

export interface QueryParams{
    typeOfPaymentId: number;

}

export interface Suppliers {
    id: number;
    name: string;
    typeOfPaymentId: number;
    typeOfPayment:{
        id: number;
        name: string;
    }
    note: string;
    createdAt: string;
    updatedAt: string;
}


export interface InitalStateSuppliers{
    data: Suppliers[],
    loading: LOADING,
    error: null | string;
}