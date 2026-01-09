import { apiInstance as API } from "../api";
import type { Athlete, Group, Session, UserInfo, Club, Coach } from "../types";
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

    async getClubById(clubId: number): Promise<Club> {
        const response = await API.get(`club/${clubId}`);
        return response;
    }

    async getClubGroups(clubId: number): Promise<Group[]> {
        const response = await API.get(`club/${clubId}/groups`);
        return response;
    }

    async getClubSessions(clubId: number): Promise<Session[]> {
        const response = await API.get(`club/${clubId}/sessions`);
        return response;
    }

    async getClubMembers(clubId: number): Promise<UserInfo[]> {
        const response = await API.get(`club/${clubId}/users`);
        return response;
    }

    async getClubAthletes(clubId: number): Promise<Athlete[]> {
        const response = await API.get(`clubs/${clubId}/athletes`);
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

    async createGroup(data: {name: string, clubId: number}): Promise<Group> {
        
        const response = await API.put("groups", data);
        return response;
    }

    async addAthleteToClub(clubId: number, athleteId: number): Promise<void> {
        const response = await API.post(`clubs/${clubId}/athletes/${athleteId}`);
        return response;
    }

    async removeAthleteFromClub(clubId: number, athleteId: number): Promise<void> {
        const response = await API.delete(`clubs/${clubId}/athletes/${athleteId}`);
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