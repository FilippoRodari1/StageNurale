import { LOADING } from "../../types";

export interface QueryParams {
    jobId?: number;
}

export interface Activities {
    id: number;
    jobId: number,
    job:{
        id: number;
        name: string;
    }
    orderId: number,
    order:{
        id:number;
        name:string;
    }
    resourceId: number,
    resource:{
        id: number;
        name: string;
    }
    startDate: string,
    endDate: string,
    workedHours: number,
    state: string,
    note: string
}

export interface InitalStateActivities{
    data: Activities[],
    loading: LOADING,
    error: null | string;
}
