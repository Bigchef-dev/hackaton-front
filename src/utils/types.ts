export type ViewMode = 'day' | 'week' | 'month';
export type NavigationDirection = 'today' | 'prev' | 'next';

export interface Session {
    id: number;
    date_session: Date;
    recurrence: number;
    duree: number;
    coach?: string;
    type: 'ENTRAINEMENT' | 'COMPETITION';
    activities?: Activity[];
    id_sport: number;
}

export interface Activity {
    id: number;
    theme: string;
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
    birthDate: string;
    phoneNumber: string;
    email: string; // Validation logic for email format should be implemented in the application layer
    gender: "M" | "F" | "X";
    type: "ATHLETE" | "COACH" | "PRESIDENT" | "ADMIN";
    password?: string;
}

export interface Athlete extends UserInfo {
    id_league: number;
}

export interface Coach {
    id: number;
    name: string;
    lastName: string;
    birthDate: string
    phoneNumber: string;
    email: string;
    gender: "M" | "F" | "X";
    type: "COACH";
    club: Club;
    sport: Sport[];
}

export interface President {
    id: number;
    name: string;
    lastName: string;
    birthDate: string
    phoneNumber: string;
    email: string;
    gender: "M" | "F" | "X";
    type: "PRESIDENT";
    club: Club;
}


export interface League {
    id: number;
    nom: string;
    niveau?: string;
    id_sport: number;
}

export interface Sport {
    id: number;
    name: string;
}

export interface Club {
    id: number;
    name: string;
    sports: Sport[];
}


interface CreateUserPayload {
    name: string;
    lastName: string;
    birthDate: string;
    phoneNumber: string;
    email: string;
    gender: "M" | "F" | "X";
    password: "adminpass";
}

export interface CreateAthletePayload extends CreateUserPayload {
    sportId: number;
    id_league: number;
}

export interface CreateCoachPayload extends CreateUserPayload {
    sportId: number;
    clubId: number;
}

export interface CreatePresidentPayload extends CreateUserPayload {
    clubId: number;
}
export interface LoginCredentials {
    email: string;
    passwordHash: string;
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

export interface Measure {
    id: number;
    name: string;
    value: number;
    unit: string;
    activityId: number;
}

export interface TypeMeasure {
    id: number;
    name: string;
    unit: string;
    activityId: number;
}

export enum UserRole {
    invite = 'INVITE',
    athlete = 'ATHLETE',
    coach = 'COACH',
    president = 'PRESIDENT',
    admin = 'ADMIN'
}