import { LOADING } from "../../types";

export interface QueryParams {
    resourceId?: number;
}

export interface SkillResources {
    id: number;
    skillResource: any;
    resourceId: number;
    resource: {
        id: number;
        name: string;
    }
    skillId: number;
    skill:{
        id: number;
        name: string;
    }
    level: number;
    note: string;
}

export interface InitalStateSkillResources{
    data: SkillResources[],
    loading: LOADING,
    error: null | string;
}

