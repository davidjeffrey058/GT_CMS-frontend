import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import Members from './pages/Members';
import Users from './pages/Users';
import App from './App';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
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
  element: <Login />
}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

