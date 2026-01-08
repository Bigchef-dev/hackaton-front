import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

export class API {
    baseuri: string;
    private axiosInstance: AxiosInstance;

    constructor(url="default") {
        this.baseuri = url;
        this.axiosInstance = axios.create({
            baseURL: this.baseuri,
        });

        // Intercepteur de REQUÊTE : Injecte automatiquement le token Bearer
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = localStorage.getItem('authToken');
                if (token && config.headers) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Intercepteur de RÉPONSE : Gère l'expiration du token (401)
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    // Token expiré ou invalide : nettoyage et redirection
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('currentUser');
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    async get(endpoint: string, params = {}) {
        try {
            const response = await this.axiosInstance.get(endpoint, { params });
            return response.data;
        } catch (error) {
            throw new Error(`GET request failed: ${error}`);
        }
    }

    async post(endpoint: string, data = {}) {
        try {
            const response = await this.axiosInstance.post(endpoint, data);
            return response.data;
        } catch (error) {
            throw new Error(`POST request failed: ${error}`);
        }
    }

    async put(endpoint: string, data = {}) {
        try {
            const response = await this.axiosInstance.put(endpoint, data);
            return response.data;
        } catch (error) {
            throw new Error(`PUT request failed: ${error}`);
        }
    }

    async delete(endpoint: string) {
        try {
            const response = await this.axiosInstance.delete(endpoint);
            return response.data;
        } catch (error) {
            throw new Error(`DELETE request failed: ${error}`);
        }
    }

}

export const apiInstance = new API("http://localhost:3001");

