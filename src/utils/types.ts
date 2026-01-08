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

export interface Coach extends UserInfo {
    clubId: number;
}

export interface President {
    clubId: number;
    id: number;
    name: string;
    lastName: string;
    birthDate: string
    phoneNumber: string;
    email: string;
    gender: "M" | "F" | "X";
    type: "PRESIDENT";
    clubName: string;
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
    id_sport: number;
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
    id_league: number;
}

export interface CreateCoachPayload extends CreateUserPayload {
    clubId: number;
}

export interface CreatePresidentPayload extends CreateUserPayload {
    clubId: number;
}
export interface CalendarEventType {
    id: number;
    title: string;
    description?: string;
    start: string; // ISO date string
    end: string; // ISO date string
    type: 'training' | 'match' | 'recovery' | 'cours' | 'td' | 'tp' | 'examen' | 'projet' | 'conference' | 'reunion';
    location?: string;
    instructor?: string;
// Authentication types*
}
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