import { LOADING } from "../../types";

export interface QueryParams {
    customerId?: number;
}

export interface Jobs {
    id: number,
    code: string,
    description: string,
    customerId: number,
    startDate: string,
    endDate: string,
    jobType: string,
    estimatedCost: number,
    estimatedRevenue: number,
    state: string,
    note: string,
    createdA: string,
    updatedAt: string,
    customer: {
        id: number,
        name: string
    }
}

export interface InitalStateJobs{
    data: Jobs[],
    loading: LOADING,
    error: null | string;
}
