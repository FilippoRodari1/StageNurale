import { LOADING } from "../../types";

export interface QueryParams{
    typeOfPaymentId: number;

}

export interface Timesheet {
    startDate: string;
    endDate: string;
    id: number
    resourceId: number
    resource : {
        name: string;
    }
    orderId: number
    order: {
        name: string;
    }
    jobId : number
    job:{
        name: string;
    }
    operationDate: string
    workedHours: number
    markType : string
    note : string
}

export interface InitalStateTimesheet{
    data: Timesheet[],
    loading: LOADING,
    error: null | string;
}