import { LOADING } from "../../types";

export interface QueryParams{
    typeOfPaymentId: number;

}

export interface TypeOfPayments {
    id: number;
    name: string;
    typeOfPaymentId: number;
    daysToFirstPayment : number;
    daysBetweenPayments : number;
    numberOfPayments : number;
    movePaymentsToTheEndOfMonth : boolean;
    daysOffsetPayments : number;
    note: string;
}


export interface InitalStateTypeOfPayments{
    data: TypeOfPayments[],
    loading: LOADING,
    error: null | string;
}