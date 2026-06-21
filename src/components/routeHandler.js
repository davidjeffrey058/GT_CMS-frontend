import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard'
import Users from '../pages/Users';
import App from '../App';
import Members from '../pages/Members';
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Finance from "../pages/Finance";
import Events from "../pages/Events"
import TestPage from "../pages/TestPage";

const RouteHandler = () => {
    const { user } = useAuthContext();

     const router = createBrowserRouter(
        [{
            path: '/',
            element: <App user={user}/>,
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
                    path: '/finance',
                    element: <Finance />
                },
                {
                    path: '/users',
                    element: <Users />
                },
                {
                    path: '/events',
                    element: <Events/>
                }
            ]
            },
            {
                path: '/login',
                element: <Login user={user}/>
            },
            {
                path: '/forgot-password',
                element: user ? <Navigate to={'/'} replace/> :  <ForgotPassword />
            },{
                path: '/reset-password/:token/:userId',
                element: user ? <Navigate to={'/'} replace/> : <ResetPassword/>
            },{
                path: '/test',
                element: <TestPage />
            }
        ]
    )
    return (
            <RouterProvider router={router} />
    )
}

export default RouteHandler;