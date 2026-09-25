import type { Member, MemberEditResponse, MemberRequest, MemberResponse } from "../models/MemberProps";
import { request } from "./app.client";

class MemberService {
    async getmembers(projectId: number): Promise<Member[]> {
        return request<Member[]>(`api/projects/${projectId}/members`, {
            method: "GET"
        });
    }

    async createMember(projectId: number, data: MemberRequest): Promise<MemberResponse> {
        return request<MemberResponse>(`api/projects/${projectId}/members`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async editMember(projectId: number, memberId: number, data: MemberRequest): Promise<MemberResponse> {
        return request<MemberResponse>(`api/projects/${projectId}/members/${memberId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteMember(projectId: number, memberId: number): Promise<MemberEditResponse> {
        return request<MemberEditResponse>(`api/projects/${projectId}/members/${memberId}`, {
            method: 'DELETE'
        });
    }
}

export const memberService = new MemberService();