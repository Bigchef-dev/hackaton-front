import { apiInstance as API } from "../api";
import type { Activity, Athlete, Session } from "../types";
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

    // =================================== POST ===================================
    async createSession(data: Session): Promise<Session> {
        if(!this.checker.isSessionValid(data)) {
            throw new Error("Invalid session data");
        }
        const response = await API.post("session", data);
        return response;
    }

    // =================================== PUT ===================================
    async updateSession(id: number, data: Partial<Session>): Promise<Session> {
        if(!this.checker.isSessionValid(data as Session)) {
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