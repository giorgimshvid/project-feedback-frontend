export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  message: string,
  userId : number
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string,
  token : string,
  user : User
}
