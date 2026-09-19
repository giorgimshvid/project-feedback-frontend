import { createBrowserRouter, redirect } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";
import { store } from "../store/store";
import { requiredAuthLoader } from "./authLoader";

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/dashboard',
        loader: requiredAuthLoader,
        element: <Dashboard />
    }
])
