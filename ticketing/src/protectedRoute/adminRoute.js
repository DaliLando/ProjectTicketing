import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorage, removeLocalStorage } from "../helpers/localStorage"


const AdminRoute =()=>{

    let user = getLocalStorage('user') ;
    let token = getLocalStorage('token');

    if(token && user.role === "admin"){
      return   <Outlet/>
    }else{
        removeLocalStorage('user')
        removeLocalStorage('token')
       return  <Navigate to="/login"/>
    }

}

export default AdminRoute