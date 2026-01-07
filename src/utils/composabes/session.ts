import { apiInstance as API } from "../api";
import type { Activity, Athlete, Session } from "../types";

export class SessionComposable {

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

}