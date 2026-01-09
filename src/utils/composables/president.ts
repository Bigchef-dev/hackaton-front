import { apiInstance as API } from "../api";
import type { Coach, Club, President } from "../types";
import { CheckerComposable as Checker } from "./checker";

export class PresidentComposable {

    checker: Checker;

    constructor() {
        this.checker = new Checker();
    }

    // =================================== GET ===================================
    async getAllPresidents(): Promise<President[]> {
        const response = await API.get("presidents");
        return response;
    }

    async getPresidentById(presidentId: number): Promise<President> {
        const response = await API.get(`users/${presidentId}`);
        return response;
    }

    async getPresidentClub(presidentId: number): Promise<Club> {
        const response = await API.get(`users/${presidentId}/club`);
        return response;
    }


  
}
