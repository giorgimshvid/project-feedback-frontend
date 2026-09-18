export interface Project {
  id: number
  name: string
  description: string
  status: 'active' | 'archived' | 'completed'
  ownerId: number
  createdAt: string
}

export interface ProjectRequest {
  name: string
  description: string
  status: string
}



export interface ProjectResponse {
  message: string
  projectId: number
}
export interface ProjectEditResponse {
  message: string
}
