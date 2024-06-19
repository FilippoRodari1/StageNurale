import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {getTokenCookies } from "../utils/Helpers"

function RequiredAuth(): ReactElement{
    const {token} = getTokenCookies();
    if(token){
        return <Outlet/>
    }
    return <Navigate to = "/login" />
}

export default RequiredAuth