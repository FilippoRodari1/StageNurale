import { LOADING } from "../../types";

export interface QueryParams{
    typeOfPaymentId?: number;

}

export interface Suppliers {
    id: number;
    name: string;
    typeOfPaymentId: number;
    note: string;
    createdAt: string;
    updatedAt: string;
}


export interface InitalStateSuppliers{
    data: Suppliers[],
    loading: LOADING,
    error: null | string;
}