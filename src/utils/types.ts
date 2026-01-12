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

export interface SessionCreate {
    title: string;
    location?: string;
    date_session: Date;
    reccurrence: number;
    duree: number;
    coach?: string;
    type: 'TRAINING' | 'COMPETITION';
    activities_id?: number[];
    id_sport: number;
    group_id: number;
    coach_id: number;
}

export interface Activity {
    id: number;
    type: string;
    baseMetrics: {
        "name": string;
        "duration": number;
        "intensity": "high" | "medium" | "low";
        "participants": number;
    };
}

export interface Group {
    id: number;
    name: string;
    clubId: number;
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
    groups?: Group[];
    quota?: number;
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
    clubId: number;
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
    leagues?: League[];
}

export interface Club {
    id: number;
    name: string;
    sports: Sport[];
    coaches?: Coach[];
    athletes?: Athlete[];
    groups?: Group[];
}


export interface CreateUserPayload {
    name: string;
    lastName: string;
    birthDate: string;
    phoneNumber: string;
    email: string;
    gender: "M" | "F" | "X";
    password: "adminpass";
    type: "ATHLETE" | "COACH" | "PRESIDENT";
}

export interface CreateUserValue extends CreateUserPayload {
    clubId?: number;
    sportIds?: number[];
}

export interface CreateAthletePayload extends CreateUserPayload {
    name: string;
    lastName: string;
    birthDate: string;
    phoneNumber: string;
    email: string;
    gender: "M" | "F" | "X";
    password: "adminpass";
    type: "ATHLETE" | "COACH" | "PRESIDENT";
    sportId: number;
    id_league: number;
}

export interface CreateCoachPayload extends CreateUserPayload {
    sportIds: number[];
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