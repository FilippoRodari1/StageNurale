import { LOADING } from "../../types";

export interface QueryParams {
    typeOfPaymentId?: number;
}

export interface Resources {
    id: number;
    firstName : string,
    lastName: string,
    hourCost: number,
    hourRevenue: number,
    curriculumVitae: string,
    supplierId: number;
    note: string
}

export interface InitalStateResources{
    data: Resources[],
    loading: LOADING,
    error: null | string;
}

