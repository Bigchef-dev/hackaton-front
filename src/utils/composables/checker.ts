import type { Session, SessionCreate, UserInfo } from "../types";


export class CheckerComposable  {

    isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    isValidPhoneNumber(phoneNumber: string): boolean {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(phoneNumber);
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
        if (userInfo.birthDate){
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
            "email",
            "gender",
        ];
        // if (!this.isUserInfoValid(userInfo)) {
        //     return false;
        // }
        return requiredFields.every(field => userInfo[field] !== undefined && userInfo[field] !== null);
    }


    isSessionValid(session: SessionCreate): boolean {
        if (typeof session.reccurrence !== 'number' || session.reccurrence < 0) {
            return false;
        }
        if (typeof session.duree !== 'number' || session.duree <= 0) {
            return false;
        }
        if (typeof session.id_sport !== 'number' || session.id_sport <= 0) {
            return false;
        }
        
        return true;
    }

    isAtheleteValid(athlete: Partial<UserInfo>): boolean {
        return this.isUserInfoValid(athlete) && this.isUserInfoComplete(athlete) && this.isLeagueIdValid(athlete.id);
    }

    isCoachValid(coach: Partial<UserInfo>): boolean {
        return this.isUserInfoValid(coach) && this.isUserInfoComplete(coach) && this.isClubIdValid(coach.id);
    }

    isClubIdValid(clubId: number | undefined): boolean {
        return typeof clubId === 'number' && clubId > 0;
    }

    isValidClub(club: {name: string}): boolean {
        if (typeof club.name !== 'string' || club.name.trim() === '') {
            return false;
        }
        return true;
    }
}