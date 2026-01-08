
import { apiInstance as API } from "../api";
import type { UserInfo, League } from "../types";


export class LeagueComposable  {
    

    async getAllLeagues(): Promise<League[]> {
        const response = await API.get("leagues");
        return response;
    }

    async getLeagueById(leagueId: string): Promise<League> {
        const response = await API.get(`leagues/${leagueId}`);
        return response;
    }

    async getLeagueMembers(leagueId: string): Promise<UserInfo[]> {
        const response = await API.get(`leagues/${leagueId}/users`);
        return response;
    }

}