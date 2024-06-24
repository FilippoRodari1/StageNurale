import { LOADING } from "../../types";

export interface QueryParams {
    supplierId?: number;
}

export interface Orders {
    id: number;
    jobId: number;
    job: {
        id: number;
        name: string;
    }
    resourceId: number;
    resource: {
        id: number;
        name: string;
    }
    supplierId: number;
    supplier: {
        id: number;
        name: string;
    }
    typeOfPaymentId: number;
    typeOfPaymentSupplierId: number;
    code: string;
    description: string;
    startDate: string; 
    endDate: string;   
    hourCost: number;
    hourRevenue: number;
    hoursAllocatedPerDay: number;
    fixedCost: number;
    orderType: string;
    note: string;
}


export interface InitalStateOrders{
    data: Orders[],
    loading: LOADING,
    error: null | string;
}
