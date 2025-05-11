import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './components/layouts/Root.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Orders from './components/Orders/Orders.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import Profile from './components/Profile/Profile.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {index: true , Component: Home},
      {path: "/login", Component: Login},
      {path: "/register", Component: Register},
      {path: "/orders", element:<PrivateRoute>
        <Orders></Orders>
      </PrivateRoute>},
      {
        path: "/profile", element:<PrivateRoute>
        <Profile></Profile>
      </PrivateRoute>
      },
      {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
