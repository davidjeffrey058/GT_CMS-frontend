import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard'
// import Users from './pages/Users';
// import App from './App';
// import Members from './pages/Members';
import { AuthContextProvider } from './context/AuthContext';
import RouteHandler from './components/routeHandler';

// const router = createBrowserRouter(
//   [{
//         path: '/',
//         element: <App />,
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
//             element: <Login/>
//         }
//     ]
// )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <React.StrictMode>
      {/* <RouterProvider router={router} /> */}
      <RouteHandler />
    </React.StrictMode>
  </AuthContextProvider>
  
);

