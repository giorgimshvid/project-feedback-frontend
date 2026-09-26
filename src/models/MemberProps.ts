export interface Member {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
    position: string
    addedAt: string
}

export interface MemberRequest {
    email: string
    firstName: string
    lastName: string
    position: string
    role?: string
}

export interface MemberResponse {
    message: string
}

export interface MemberEditResponse {
    message: string
}