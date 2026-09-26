import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";
import { requiredAuthLoader } from "./authLoader";
import ProjectDetail from "../pages/ProjectDetail";
import Layout from "../components/Layout";

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
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
                path: '/projects/:projectId',
                loader: requiredAuthLoader,
                element: <ProjectDetail />
            },
            {
                path: '/dashboard',
                loader: requiredAuthLoader,
                element: <Dashboard />
            }
        ]
    },
])