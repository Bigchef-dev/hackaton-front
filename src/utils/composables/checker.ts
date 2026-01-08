import type { Club, Session, UserInfo } from "../types";


export class CheckerComposable  {

    isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    isValidPhoneNumber(phoneNumber: string): boolean {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(phoneNumber);
    }
    isValidDate(dateString: Date): boolean {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    }

    isLeagueIdValid(leagueId: number | undefined): boolean {
        return typeof leagueId === 'number' && leagueId > 0;
    }

    isUserInfoValid(userInfo: Partial<UserInfo>): boolean {
        if (userInfo.email && !this.isValidEmail(userInfo.email)) {
            return false;
        }
        if (userInfo.phoneNumber && !this.isValidPhoneNumber(userInfo.phoneNumber)) {
            return false;
        }
        if (userInfo.birthDate && !this.isValidDate(userInfo.birthDate)) {
            return false;
        }
        return true;
    }

    isUserInfoComplete(userInfo: Partial<UserInfo>): boolean {
        const requiredFields: (keyof UserInfo)[] = [
            "name",
            "lastName",
            "birthDate",
            "phoneNumber",
            "adress",
            "email",
            "gender",
        ];
        if (!this.isUserInfoValid(userInfo)) {
            return false;
        }
        return requiredFields.every(field => userInfo[field] !== undefined && userInfo[field] !== null);
    }


    isSessionValid(session: Session): boolean {
        if (typeof session.reccurcivite !== 'number' || session.reccurcivite < 0) {
            return false;
        }
        if (typeof session.duree !== 'number' || session.duree <= 0) {
            return false;
        }
        if (typeof session.id_sport !== 'number' || session.id_sport <= 0) {
            return false;
        }
        if (!this.isValidDate(session.date_session)) {
            return false;
        }
        return true;
    }

    isAtheleteValid(athlete: Partial<UserInfo>): boolean {
        return this.isUserInfoValid(athlete) && this.isUserInfoComplete(athlete) && this.isLeagueIdValid(athlete.id);
    }

    isValidClub(club: Club): boolean {
        if (typeof club.name !== 'string' || club.name.trim() === '') {
            return false;
        }
        if (typeof club.id_sport !== 'number' || club.id_sport <= 0) {
            return false;
        }
        return true;
    }
}