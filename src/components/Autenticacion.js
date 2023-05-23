

import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
import Cookies from "universal-cookie"




function Autenticacion({children}) {
    
    const cookies = new Cookies();
    const IsAutenticacion = cookies.get('MyCookies')


    if (IsAutenticacion) {

        return <Navigate to="/admin" />

    }


    return children ? children: <Outlet />
  
}

export default Autenticacion
