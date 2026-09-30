import type {
  FeedbackEvaluationRequest,
  FeedbackEvaluationResponse,
  FeedbackEvaluationSubmitRequest,
  FeedbackEvaluationSubmitResponse,
  FeedbackQuestionRequest,
  FeedbackQuestionResponse,
} from "../models/FeedbackProps";
import { request } from "./app.client";

class FeedbackService {
  async createQuestionnare(
    projectId: number,
    data: FeedbackQuestionRequest,
  ): Promise<FeedbackQuestionResponse> {
    return request<FeedbackQuestionResponse>(
      `api/feedback/projects/${projectId}/questionnaires`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
  }

  async createEvaluation(
    projectId: number,
    data: FeedbackEvaluationRequest,
  ): Promise<FeedbackEvaluationResponse> {
    return request<FeedbackEvaluationResponse>(
      `api/feedback/projects/${projectId}/evaluations`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
  }

  async createSubmit(
    evaluationId: number,
    data: FeedbackEvaluationSubmitRequest,
  ): Promise<FeedbackEvaluationSubmitResponse> {
    return request<FeedbackEvaluationSubmitResponse>(
      `api/feedback/projects/${evaluationId}/submit`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
  }
  //   async getProjects(): Promise<Project[]> {
  //     return request<Project[]>("api/projects", {
  //       method: "GET",
  //     });
  //   }

  //   async createProject(data: ProjectRequest): Promise<ProjectResponse> {
  //     return request<ProjectResponse>("api/projects", {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //     });
  //   }

  //   async editProject( id: number, data: ProjectRequest ): Promise<ProjectEditResponse> {
  //     return request<ProjectEditResponse>(`api/projects/${id}`, {
  //       method: 'PUT',
  //       body: JSON.stringify(data)
  //     });
  //   }

  //   async deleteProject(id: number): Promise<ProjectEditResponse> {
  //     return request<ProjectEditResponse>(`api/projects/${id}`, {
  //       method: 'DELETE'
  //     });
  //   }
}

export const feedbackService = new FeedbackService();
