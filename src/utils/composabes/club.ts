import { apiInstance as API } from "../api";
import type { Athlete, Group, Session, UserInfo, Club } from "../types";


export class ClubComposable  {
    

    async getAllClubs(): Promise<Club[]> {
        const response = await API.get("clubs");
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

}