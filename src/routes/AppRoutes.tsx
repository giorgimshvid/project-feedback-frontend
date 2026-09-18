import { createBrowserRouter, redirect } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";
import { store } from "../store/store";

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
        loader: () => {
            const isAuthenticated = store.getState().auth.isAuthenticated;
            if (!isAuthenticated) {
                return redirect('/Login');
            }
            return null;
        },
        element: <Dashboard />
    }
])