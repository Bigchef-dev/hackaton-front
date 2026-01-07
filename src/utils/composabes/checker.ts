import type { UserInfo } from "../types";


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
}