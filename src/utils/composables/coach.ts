import { apiInstance as API } from "../api";
import type { Coach, Club, CreateCoachPayload } from "../types";
import { CheckerComposable as Checker } from "./checker";

export class CoachComposable {

    checker: Checker;

    constructor() {
        this.checker = new Checker();
    }

    // =================================== GET ===================================
    async getAllCoaches(): Promise<Coach[]> {
        const response = await API.get("coaches");
        return response;
    }

    async getCoachById(coachId: number): Promise<Coach> {
        const response = await API.get(`users/${coachId}`);
        return response;
    }

    async getCoachClub(coachId: number): Promise<Club> {
        const response = await API.get(`users/${coachId}/club`);
        return response;
    }

    // =================================== PUT ===================================
    async updateCoach(coachId: number, data: Coach): Promise<Coach> {
        if (!this.checker.isCoachValid(data)) {
            throw new Error("Invalid coach data");
        }

        const response = await API.put(`coaches/${coachId}`, data);
        return response;
    }

    // =================================== POST ===================================
    async createCoach(data: CreateCoachPayload): Promise<Coach> {
        if (!this.checker.isCoachValid(data)) {
            throw new Error("Invalid coach data");
        }

        const response = await API.post("coaches", data);
        return response;
    }

    // =================================== DELETE ===================================
    async deleteCoach(coachId: number): Promise<void> {
        const response = await API.delete(`coaches/${coachId}`);
        return response;
    }
}
