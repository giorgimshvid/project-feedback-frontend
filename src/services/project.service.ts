import axios from "axios";

export const projectService = {
  getProjects: async () => {
    const response = await axios.get("/api/projects");
    return response.data;
  },
  createProject: async (data: {
    title: string;
    description: string;
    status: string;
  }) => {
    const response = await axios.post("/api/projects", data);
    return response.data;
  },
  deleteProject: async (id: string) => {
    const response = await axios.delete(`/api/projects/${id}`);
    return response.data;
  },
};
