import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard'
import Users from '../pages/Users';
import App from '../App';
import Members from '../pages/Members';
import { useAuthContext } from "../hooks/useAuthContext";
// import Redirect from "./redirect";
import { Navigate } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";


const RouteHandler = () => {
    const { user } = useAuthContext();

    // const router = createBrowserRouter(
    //     [{
    //         path: '/',
    //         element: user? <App /> : <Navigate to={'/login'} replace/>,
    //         errorElement: <div>Page not found</div>,
    //         children: [
    //             {
    //                 path: '/',
    //                 element: <Dashboard />
    //             },
    //             {
    //                 path: '/members',
    //                 element: <Members />  
    //             },
    //             {
    //                 path: '/users',
    //                 element: <Users />
    //             }
    //         ]
    //         },
    //         {
    //             path: '/login',
    //             element: user ? <Navigate to={'/'} replace/> : <Login/>
    //         },
    //         {
    //             path: '/forgot-password',
    //             element: user ? <Navigate to={'/'} replace/> : <ForgotPassword />
    //         },{
    //             path: '/reset-password/:token/:userId',
    //             element: user ? <Navigate to={'/'} replace/> : <ResetPassword/>
    //         }
    //     ]
    // )

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
                    path: '/users',
                    element: <Users />
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
            }
        ]
    )
    return (
            <RouterProvider router={router} />
    )
}

export default RouteHandler;