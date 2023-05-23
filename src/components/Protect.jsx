import { Navigate, Outlet } from "react-router-dom"
import Cookies from "universal-cookie"




export const Protect = ({ children }) => {

  const cookies = new Cookies();

  const token = cookies.get('Token')


  if (!token) {

    return <Navigate to="/login" />

  }



  return children ? children : <Outlet />

}



