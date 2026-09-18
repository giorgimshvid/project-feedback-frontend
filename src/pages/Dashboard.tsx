
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectService } from "../services/project.service";
import type { Project } from "../models/ProjectProps";
import { logoutUser } from "../store/slices/authSlice";
import { authService } from "../services/auth.service";
import ProjectModal from "../components/ProjectModal";

export const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [projects, setProjects] = useState<Project[]>([]);
    const [project, setProject] = useState<Project | null>(null);
    const [loadingProject, setloadingProject] = useState<boolean>(false);
    const [projectModal, setProjectModal] = useState<boolean>(false);

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

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch(error) {
            console.log(error);
        } 
        dispatch(logoutUser())
        navigate('/login') 
    }

    const handleAddOrEditProject = () => {
        setProjectModal(true);
    }

    // const handleAddProject = (data: Project) => {
    //     setProject(data);
    // }

    // console.log(projects);

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
                        <button className="logout-btn text-white px-4 py-2 bg-emerald-600" onClick={handleAddOrEditProject}>Add Project</button>
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
            <ProjectModal 
                onClose={() => setProjectModal(false)}
                isOpened={projectModal}
                onProjectSave={fetchProjects}
                project={project}
            />
        </>
    )
}