import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useUser} from "../../hooks/useUser";

function ProtectedRoute({redirectPath = '/login'}) {

    const userId = useUser()

    if (!userId) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet/>;
}

export default ProtectedRoute;

