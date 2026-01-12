import { apiInstance as API } from "../api";
import type { Activity, Athlete, Session, SessionCreate } from "../types";
import { CheckerComposable as Checker} from "./checker";

export class SessionComposable {

    checker: Checker;
    constructor() {
        this.checker = new Checker();
    }

    // =================================== GET ===================================
    async getSessionInfo(id: number): Promise<Session> {
        const response = await API.get(`session/${id}/info`);
        return response;
    }

    async getSessionAthletes(id: number): Promise<Athlete[]> {
        const response = await API.get(`session/${id}/athletes`);
        return response;
    }

    async getSessionActivities(id: number): Promise<Activity[]> {
        const response = await API.get(`session/${id}/activities`);
        return response;
    }

    async getAllActivities(): Promise<Activity[]> {
        const response = await API.get(`activites`);
        return response;
    }

    // =================================== POST ===================================
    async createSession(data: SessionCreate): Promise<Session> {
        if(!this.checker.isSessionValid(data)) {
            throw new Error("Invalid session data");
        }
        const response = await API.post("sceances", data);
        return response;
    }

    // =================================== PUT ===================================
    async updateSession(id: number, data: Partial<Session>): Promise<Session> {
        if(!this.checker.isSessionValid(data as SessionCreate)) {
            throw new Error("Invalid session data");
        }
        const response = await API.put(`session/${id}`, data);
        return response;
    }

    // =================================== DELETE ===================================
    async deleteSession(id: number): Promise<void> {
        const response = await API.delete(`session/${id}`);
        return response;
    }

}