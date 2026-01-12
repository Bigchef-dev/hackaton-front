import { apiInstance as API } from "../api";
import type { Activity, Athlete, Session, SessionCreate } from "../types";
import { CheckerComposable as Checker} from "./checker";

export class SessionComposable {

    checker: Checker;
    constructor() {
        this.checker = new Checker();
    }

    // =================================== GET ===================================
    async getAllSessions(): Promise<Session[]> {
        const response = await API.get("sceances");
        return response;
    }

    async getSessionById(id: number): Promise<Session> {
        const response = await API.get(`sceances/${id}`);
        return response;
    }

    async getSessionsByCoach(coachId: number): Promise<Session[]> {
        const response = await API.get(`sceances/by-coach/${coachId}`);
        return response;
    }

    async getSessionsByGroup(groupId: number): Promise<Session[]> {
        console.log("Calling");
        
        const response = await API.get(`sceances/by-group/${groupId}`);
        console.log(response);
        
        return response;
    }

    async getSessionsByAthlete(athleteId: number): Promise<Session[]> {
        const response = await API.get(`sceances/by-athlete/${athleteId}`);
        return response;
    }

    async getSessionAthletes(id: number): Promise<Athlete[]> {
        const response = await API.get(`sceances/${id}/athletes`);
        return response;
    }

    async getAllActivities(): Promise<Activity[]> {
        const response = await API.get(`activites`);
        return response;
    }

    // =================================== POST ===================================
    async createSession(data: SessionCreate, clubId: number, coachId?: number): Promise<Session> {
        if(!this.checker.isSessionValid(data)) {
            throw new Error("Invalid session data");
        }
        const query = coachId ? `?clubId=${clubId}&coachId=${coachId}` : `?clubId=${clubId}`;
        const response = await API.post(`sceances${query}`, data);
        return response;
    }

    async addGroupToSession(sessionId: number, groupId: number): Promise<Session> {
        const response = await API.post(`sceances/${sessionId}/groups/${groupId}`);
        return response;
    }

    // =================================== PUT/PATCH ===================================
    async updateSession(id: number, data: Partial<SessionCreate>, coachId?: number): Promise<Session> {
        if(!this.checker.isSessionValid(data as SessionCreate)) {
            throw new Error("Invalid session data");
        }
        const query = coachId ? `?coachId=${coachId}` : '';
        const response = await API.put(`sceances/${id}${query}`, data);
        return response;
    }

    async updateActivityMetrics(sessionId: number, activityId: number, metrics: any): Promise<any> {
        const response = await API.put(`sceances/${sessionId}/activites/${activityId}/metrics`, { metrics });
        return response;
    }

    // =================================== DELETE ===================================
    async deleteSession(id: number): Promise<{ success: boolean }> {
        const response = await API.delete(`sceances/${id}`);
        return response;
    }

    async removeGroupFromSession(sessionId: number, groupId: number): Promise<Session> {
        const response = await API.delete(`sceances/${sessionId}/groups/${groupId}`);
        return response;
    }
}