
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

    const { user, isAuthenticated, isLoading} = useSelector((state: RootState) => state.auth);

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate, isLoading])

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

    const handleOpenAddModal = () => {
        setProject(null);
        setProjectModal(true);
    }
    const handleOpenEditAddModal = (selectedProject: Project) => {
        setProject(selectedProject);
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
            <main className="min-h-screen bg-slate-50 px-6 pb-12">
                <div className="mx-auto max-w-7xl">
                    <div className="add-btn-wrap flex justify-center my-6">
                        <button className="logout-btn text-white px-4 py-2 bg-emerald-600" onClick={handleOpenAddModal}>Add Project</button>
                    </div>
                    <div className="projects-wrap w-full flex justify-around flex-wrap">
                        {
                            loadingProject ? <p className="text-center my-5 text-slate-500">Projects are loading...</p> :

                  projects?.length === 0 ? <p className="text-center my-5 text-slate-500">Projects are not added yet</p> : (projects ?? []).map(proj =>
                                <div
                                    key={proj.id}
                                    onClick={() => handleOpenEditAddModal(proj)}
                                    className="group flex basis-[23%] cursor-pointer flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                                >
                                    <p className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-emerald-700">name: {proj.name}</p>
                                    <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">description: {proj.description}</p>
                                    <p className={`w-fit rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide text-white ${proj.status === 'active' ? 'bg-emerald-400' : proj.status === 'archived' ? 'bg-gray-400' : 'bg-blue-400' }`}>status: {proj.status}</p>
                                    <p className="mt-auto border-t border-slate-100 pt-3 text-xs text-slate-400">createdAt: {proj.createdAt}</p>
                                </div>
                                // status: 'active' | 'archived' | 'completed'
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
