import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

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
    }
])