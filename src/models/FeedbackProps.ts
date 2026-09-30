export interface FeedbackQuestionRequest {
  title: string;
  questions: FeedbackQuestion[];
}

export interface FeedbackQuestion {
  text: string;
  options: string[];
}

export interface FeedbackQuestionResponse {
  message: string;
  questionnareId?: number;
}

export interface FeedbackEvaluationRequest {
  questionnareId: number;
  evaluatorId: number;
  evaluateeId: number;
}

export interface FeedbackEvaluationResponse {
  message: string;
}

export interface FeedbackEvaluationSubmitRequest {
  answers: FeedbackEvaluationAnswer[];
}

export interface FeedbackEvaluationSubmitResponse {
  message: string;
}

export interface FeedbackEvaluationAnswer {
  questionId: number;
  optionId: number;
}
