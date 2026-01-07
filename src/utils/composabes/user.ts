import { apiInstance as API } from "../api";
import type { Group, Session, UserInfo } from "../types";


export class UserComposable  {
    

    async getAllUsers() : Promise<UserInfo[]> {
        const response = await API.get("users");
        return response;
    }

    async getUserById(userId: string): Promise<UserInfo> {
        const response = await API.get(`users/${userId}`);
        return response;
    }

    async getUserGroups(userId: string): Promise<Group[]> {
        const response = await API.get(`users/${userId}/groups`);
        return response;
    }

    async getUserSessions(userId: string): Promise<Session[]> {
        const response = await API.get(`users/${userId}/sessions`);
        return response;
    }

    async getUserInfo() {
        const response = await API.get("user/info");
        return response;
    }
}