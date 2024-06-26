import { LOADING } from "../../types";

export interface QueryParams {
    id?: number;
}

export interface User {
    id: number;
    email: string,
    password: string,
    passwordConfirm: string,
    firstName: string,
    lastName: string,
    phone: string,
    requiredActions: [
      string
    ],
    realmRoles: [
      string
    ],
    resourceId: number,
    hasDarkTheme: true
  }

export interface InitalStateUser{
    data: User[],
    loading: LOADING,
    error: null | string;
}
