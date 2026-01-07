import { apiInstance as API } from "../api";
import type { Group, Session, UserInfo } from "../types";

import { CheckerComposable as Checker } from "./checker";

export class UserComposable  {
    
    checker: Checker;

    constructor() {
        this.checker = new Checker();
    }

    // =================================== GET ===================================
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

    async getUserInfo(userId: string) {
        const response = await API.get(`users/${userId}`);
        return response;
    }

    // =================================== PUT ===================================
    async updateUserInfo( userId: number, data: Partial<UserInfo>): Promise<UserInfo> {
        if(!this.checker.isUserInfoValid(data)) {
            throw new Error("Invalid user info data");
        }
        if(!this.checker.isUserInfoComplete(data)) {
            throw new Error("Incomplete user info data");
        }
        const response = await API.put(`users/${userId}`, data);
        return response;
    }

    // =================================== POST ===================================
    async createUser(data: Partial<UserInfo>): Promise<UserInfo> {
        if(!this.checker.isUserInfoValid(data)) {
            throw new Error("Invalid user info data");
        }
        if(!this.checker.isUserInfoComplete(data)) {
            throw new Error("Incomplete user info data");
        }
        const response = await API.post("users", data);
        return response;
    }

    // =================================== DELETE ===================================
    async deleteUser(userId: string): Promise<{ message: string }> {
        const response = await API.delete(`users/${userId}`);
        return response;
    }

}