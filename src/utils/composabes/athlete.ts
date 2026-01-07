import { apiInstance as API } from "../api";
import type { Athlete, League, } from "../types";

export class AthleteComposable {

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
}
