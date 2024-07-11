import { LOADING } from "../../types";

export interface QueryParams {
    typeOfPaymentId?: number;
}

export interface Resources {
    id: number;
    level: any;
    skill: any;
    typeOfPaymentId: any;
    resourceId: number;
    firstName : string,
    lastName: string,
    hourCost: number,
    hourRevenue: number,
    curriculumVitae: string,
    supplierId: number;
    supplier: {
        id: number,
        name: string
    }
    note: string
}

export interface InitalStateResources{
    data: Resources[],
    loading: LOADING,
    error: null | string;
}

