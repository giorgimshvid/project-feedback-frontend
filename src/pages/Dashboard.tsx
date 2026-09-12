
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectService } from "../services/project.service";
import type { Project } from "../models/ProjectProps";
import { logoutUser } from "../store/slices/authSlice";

export const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [projects, setProjects] = useState<Project[]>([]);
    const [loadingProject, setloadingProject] = useState<boolean>(false);

    const { user, isAuthenticated} = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if(!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    const fetchProjects = async () => {
        try {
            setloadingProject(true);
            const data = await projectService.getProjects();
            setProjects(data);
        } catch(error) {
            console.log(error);
        } finally {
            setloadingProject(false);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchProjects();
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/login') 
    }

    console.log(projects);

    return (
        <>
            <header className="flex justify-between bg-[#2f323d] py-4 px-7">
                <div className="user-info flex justify-center gap-x-10 text-white">
                    <p className="font-bold">User: </p>
                    <p>{user?.firstName}</p>
                    <p>{user?.lastName}</p>
                    <p>{user?.email}</p>
                </div>
                <div className="logout-btn text-white px-4 py-2 bg-emerald-600">
                   <button onClick={handleLogout}>Logout</button> 
                </div>
            </header>
            <main>
                <div>
                    <div className="add-btn-wrap flex justify-center my-6">
                        <button className="logout-btn text-white px-4 py-2 bg-emerald-600">Add Project</button>
                    </div>
                    <div className="projects-wrap w-full">
                        {   
                            loadingProject ? <p className="text-center my-5">Projects are loading...</p> :
                            
                            projects?.length === 0  ? <p className="text-center my-5">Projects are not added yet</p> : projects.map(proj => 
                                <div>
                                    <p>name: {proj.name}</p>
                                    <p>description: {proj.description}</p>
                                    <p>status: {proj.status}</p>
                                    <p>createdAt: {proj.createdAt}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </main>
        </>
    )
}