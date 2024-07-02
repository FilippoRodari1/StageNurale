import { LOADING } from "../../types";

export interface QueryParams {
    id?: number;
}

export interface Skills {
    id: number;
    name: string;
    skillType : string;
    note : string;
}

export interface InitalStateSkills{
    data: Skills[],
    loading: LOADING,
    error: null | string;
}

