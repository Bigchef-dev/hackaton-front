import { apiInstance as API } from "../api";
import type { Athlete, Group, Session, UserInfo, Club, Sport } from "../types";
import { CheckerComposable as Checker } from "./checker";


export class SportComposable  {
    
    checker: Checker;
    constructor() {
        this.checker = new Checker();
    }

    // =================================== GET ===================================
    async getAllSports(): Promise<Sport[]> {
        const response = await API.get("sport");
        return response;
    }

    async getSportById(sportId: string): Promise<Sport> {
        const response = await API.get(`sports/${sportId}`);
        return response;
    }

    // =================================== PUT ===================================
    async createSport(data: {name: string}): Promise<Sport> {
        const response = await API.put("sport", data);
        return response;
    }


    // =================================== DELETE ===================================
    async deleteSport(sportId: number): Promise<void> {
        const response = await API.delete(`sport/${sportId}`);
        return response;
    }

}