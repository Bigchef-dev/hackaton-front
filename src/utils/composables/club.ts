import { apiInstance as API } from "../api";
import type { Athlete, Group, Session, UserInfo, Club } from "../types";
import { CheckerComposable as Checker } from "./checker";


export class ClubComposable  {
    
    checker: Checker;
    constructor() {
        this.checker = new Checker();
    }

    // =================================== GET ===================================
    async getAllClubs(): Promise<Club[]> {
        const response = await API.get("club");
        return response;
    }

    async getClubById(clubId: string): Promise<Club> {
        const response = await API.get(`clubs/${clubId}`);
        return response;
    }

    async getClubGroups(clubId: string): Promise<Group[]> {
        const response = await API.get(`clubs/${clubId}/groups`);
        return response;
    }

    async getClubSessions(clubId: string): Promise<Session[]> {
        const response = await API.get(`clubs/${clubId}/sessions`);
        return response;
    }

    async getClubMembers(clubId: string): Promise<UserInfo[]> {
        const response = await API.get(`clubs/${clubId}/users`);
        return response;
    }

    async getClubAthletes(clubId: string): Promise<Athlete[]> {
        const response = await API.get(`clubs/${clubId}/athletes`);
        return response;
    }

    async getClubCoaches(clubId: string): Promise<UserInfo[]> {
        const response = await API.get(`clubs/${clubId}/coaches`);
        return response;
    }

    // =================================== POST ===================================
    async createClub(data: {name: string}): Promise<Club> {
        if(!this.checker.isValidClub(data)) {
            throw new Error("Invalid club data");
        }
        const response = await API.put("club", data);
        return response;
    }

    // =================================== PUT ===================================
    async updateClub( clubId: number, data: Partial<Club>): Promise<Club> {
        const response = await API.put(`clubs/${clubId}`, data);
        return response;
    }

    // =================================== DELETE ===================================
    async deleteClub(clubId: number): Promise<void> {
        const response = await API.delete(`club/${clubId}`);
        return response;
    }

}