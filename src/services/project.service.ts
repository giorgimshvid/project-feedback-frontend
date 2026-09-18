import type { Project, ProjectEditResponse, ProjectRequest, ProjectResponse } from "../models/ProjectProps";
import { request } from "./app.client";

class ProjectService {
  async getProjects(): Promise<Project[]> {
    return request<Project[]>("api/projects", {
      method: "GET",
    });
  }

  async createProject(data: ProjectRequest): Promise<ProjectResponse> {
    return request<ProjectResponse>("api/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async editProject( id: number, data: ProjectRequest ): Promise<ProjectEditResponse> {
    return request<ProjectEditResponse>(`api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteProject(id: number): Promise<ProjectEditResponse> {
    return request<ProjectEditResponse>(`api/projects/${id}`, {
      method: 'DELETE'
    });
  }

}


export const projectService = new ProjectService();
