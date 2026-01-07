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

export interface CalendarEventType {
    id: number;
    title: string;
    description?: string;
    start: string; // ISO date string
    end: string; // ISO date string
    type: 'training' | 'match' | 'recovery' | 'cours' | 'td' | 'tp' | 'examen' | 'projet' | 'conference' | 'reunion';
    location?: string;
    instructor?: string;
}