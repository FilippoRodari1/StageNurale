import { LOADING } from "../../types";

export interface QueryParams {
    typeOfPaymentId?: number;
}

export interface Resources {
    level: any;
    skill: any;
    typeOfPaymentId: any;
    id: number;
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

