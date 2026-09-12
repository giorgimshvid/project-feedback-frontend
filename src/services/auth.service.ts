import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from "../models/AuthProps";
import { request } from "./app.client";

// The JSON data must be stringified when sending to back, as the body has to be a string.
class AuthServices {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return request<RegisterResponse>("api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    return request<LoginResponse>("api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getMe(): Promise<{ user: User }> {
    return request<{ user: User }>("api/auth/me", { method: "GET" });
  }
}

export const authService = new AuthServices();
