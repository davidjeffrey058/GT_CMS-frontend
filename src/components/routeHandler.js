import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard'
import Users from '../pages/Users';
import App from '../App';
import Members from '../pages/Members';
import { useAuthContext } from "../hooks/useAuthContext";
// import Redirect from "./redirect";
import { Navigate } from "react-router-dom";


const RouteHandler = () => {
    const { user } = useAuthContext();

    const router = createBrowserRouter(
        [{
            path: '/',
            element: user? <App /> : <Navigate to={'/login'} replace/>,
            errorElement: <div>Page not found</div>,
            children: [
                {
                    path: '/',
                    element: <Dashboard />
                },
                {
                    path: '/members',
                    element: <Members />  
                },
                {
                    path: '/users',
                    element: <Users />
                }
            ]
            },
            {
                path: '/login',
                element: user?<Navigate to={'/'} replace/> : <Login/>
            }
        ]
    )
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default RouteHandler;