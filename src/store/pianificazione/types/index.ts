import { LOADING } from "../../types";

export interface QueryParams {
    id?: number;
}

export interface Pianificazione{
    id: number;
    isSale : boolean;
    valueCategory :	string;
    description : string;
    startDate : string;
    endDate : string;
    daysBetween : number;
    fixedDay : number;
    netValue : number;
    vatValue : number;
    grossValue : number;
    note : string;
}


export interface InitalStatePianificazione{
    data: Pianificazione[],
    loading: LOADING,
    error: null | string;
}
