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
        const response = await API.get("athletes");
        return response;
    }

    async getAthleteById(athleteId: string): Promise<Athlete> {
        const response = await API.get(`athletes/${athleteId}`);
        return response;
    }

    async getAthleteLeague(athleteId: string): Promise<League> {
        const response = await API.get(`athletes/${athleteId}/league`);
        return response;
    }

    // =================================== PUT ===================================
    async updateAthlete( athleteId: number, data: Athlete): Promise<Athlete> {
        if(!this.checker.isAtheleteValid(data as Athlete)) {
            throw new Error("Invalid athlete data");
        }
        const response = await API.put(`athletes/${athleteId}`, data);
        return response;
    }

    // =================================== POST ===================================
    async createAthlete(data:Athlete): Promise<Athlete> {
        if(!this.checker.isAtheleteValid(data)) {
            throw new Error("Invalid athlete data");
        }
        const response = await API.post("athletes", data);
        return response;
    }

    // =================================== DELETE ===================================
    async deleteAthlete(athleteId: number): Promise<void> {
        const response = await API.delete(`athletes/${athleteId}`);
        return response;
    }
}
