export interface Session {
    id: number;
    date_session: Date;
    reccurcivite: number;
    duree: number;
    id_sport: number;
}

export interface Activity {
    id: number;
    theme: string;
    id_type_stat: number;
}

export interface Group {
id: number;
    name: string;
    id_club: number;
}

export interface UserInfo {
    id: number;
    name: string;
    lastName: string;
    birthDate: Date;
    phoneNumber: string;
    adress: string;
    email: string; // Validation logic for email format should be implemented in the application layer
    gender: "M" | "F" | "X";
    type: "ATHLETE" | "COACH" | "PRESIDENT" | "ADMIN" | "USER";
}

export interface Athlete extends UserInfo {
    id_league: number;
}

export interface Coach extends UserInfo {
    id_club: number;
}

export interface President extends UserInfo {
    id_club: number;
}

export interface League {
    id: number;
    nom: string;
    niveau?: string;
    id_sport: number;
}

export interface Sport {
    id: number;
    nom: string;
}

export interface Club {
    id: number;
    name: string;
    id_sport: number;
}

// Authentication types
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AdminLoginCredentials {
    password: string;
}

export interface AuthToken {
    token: string;
    expiresAt?: Date;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface AuthState {
    user: UserInfo | null;
    token: string | null;
    isAuthenticated: boolean;
}