import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ( {children, access, redirectLink} ) => {
    return  access ? children : <Navigate to={redirectLink}/>
}

export default PrivateRoute