import type { ProjectRequest, ProjectResponse } from "../models/ProjectProps";
import { request } from "./app.client";

class ProjectService {
  async getProjects() {
    return request("/api/projects", {
      method: "GET",
    });
  }

  async createProject(data: ProjectRequest): Promise<ProjectResponse> {
    return request<ProjectResponse>("/api/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}


export const projectService = new ProjectService();
