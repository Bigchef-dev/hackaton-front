import { apiInstance as API } from "../api";
import type { Athlete, League, } from "../types";
import { CheckerComposable as Checker } from "./checker";

export class AthleteComposable {

    checker: Checker; 
    constructor() {
        this.checker = new Checker();
    }

    // =================================== GET ===================================
    async getAllAthletes(): Promise<Athlete[]> {
        const response = await API.get("users");
        // Filter for athletes
        return response.filter((user: any) => user.type === 'ATHLETE');
    }

    async getAthleteById(athleteId: number): Promise<Athlete> {
        const response = await API.get(`users/${athleteId}`);
        return response;
    }

    async getAthletesWithoutGroup(): Promise<Athlete[]> {
        const response = await API.get("users/athletes/without-group");
        return response;
    }

    // =================================== PUT ===================================
    async setAthleteLeague(athleteId: number, leagueId: number): Promise<Athlete> {
        const response = await API.put(`users/athlete/${athleteId}/league`, { leagueId });
        return response;
    }

    async updateSeuilEntrainement(athleteId: number, seuilEntrainement: number): Promise<Athlete> {
        const response = await API.put(`users/athlete/${athleteId}/seuil-entrainement`, { seuilEntrainement });
        return response;
    }

    // =================================== POST ===================================
    async createAthlete(data: Omit<Athlete, 'id'>): Promise<Athlete> {
        if(!this.checker.isAtheleteValid(data as Athlete)) {
            throw new Error("Invalid athlete data");
        }
        const response = await API.post("users/athlete", data);
        return response;
    }

    // =================================== DELETE ===================================
    async deleteAthlete(athleteId: number): Promise<void> {
        const response = await API.delete(`users/${athleteId}`);
        return response;
    }
}
