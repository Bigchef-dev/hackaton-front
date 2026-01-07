import axios from "axios";

export class API {
    baseuri: string;

    constructor(url="default") {
    this.baseuri = url;

    }

    async get(endpoint: string, params = {}) {
        try {
            const response = await axios.get(`${this.baseuri}/${endpoint}`, { params });
            return response.data;
        } catch (error) {
            throw new Error(`GET request failed: ${error}`);
        }
    }

    async post(endpoint: string, data = {}) {
        try {
            const response = await axios.post(`${this.baseuri}/${endpoint}`, data);
            return response.data;
        } catch (error) {
            throw new Error(`POST request failed: ${error}`);
        }
    }

}

export const apiInstance = new API("http://localhost:5000");

