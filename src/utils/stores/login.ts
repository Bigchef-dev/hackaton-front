import { defineStore } from "pinia"
import { UserRole } from "../types";

export const useAuthStore = defineStore('auth', {

    state: () => ({
        currentUser: {
            id: 0,
            name: '',
            role: UserRole.invite,
            avatar: ''
        }
    }),
    getters: {
        isAuthenticated: (state) => state.currentUser.role !== UserRole.invite,
        userRole: (state) => state.currentUser.role,
    },
    actions: {
        setCurrentUser(user: { id: number; name: string; role: UserRole; avatar: string }) {
            this.$patch({ currentUser: user });
        },
        clearUser() {
            this.$patch({
                currentUser: {
                    id: 0,
                    name: '',
                    role: UserRole.invite,
                    avatar: ''
                }
            });
        }
    },
})