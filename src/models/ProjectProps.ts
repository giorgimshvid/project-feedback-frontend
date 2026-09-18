export interface Project {
  id: number
  name: string
  description: string
  status: 'active' | 'on going' | 'completed'
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
