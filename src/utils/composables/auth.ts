import { ref, computed } from 'vue';
import { apiInstance as API } from '../api';
import { type LoginCredentials, type AdminLoginCredentials, type LoginResponse, type UserInfo, UserRole } from '../types';
import { useAuthStore } from '../stores/login';

// État réactif global de l'authentification
const currentUser = ref<UserInfo | null>(null);
const authToken = ref<string | null>(null);

export class AuthComposable {

    constructor() {
        this.initAuth();
    }

    // =================================== INITIALIZATION ===================================
    private initAuth(): void {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('currentUser');

        if (storedToken && storedUser) {
            authToken.value = storedToken;
            try {
                currentUser.value = JSON.parse(storedUser);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                this.logout();
            }
        }
    }

    // =================================== POST ===================================
    async login(credentials: LoginCredentials): Promise<UserInfo> {
        const response: LoginResponse = await API.post('auth/login', credentials);

        authToken.value = response.access_token;
        localStorage.setItem('authToken', response.access_token);

        try {
            const user: UserInfo = await API.get('users/me');
            currentUser.value = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            const store = useAuthStore();
            const role = user.type == 'ADMIN' ? UserRole.admin : (user.type == 'COACH' ? UserRole.coach : (user.type == 'PRESIDENT' ? UserRole.president : UserRole.athlete));
            store.setCurrentUser({ id: user.id, name: user.name, role: role, avatar: "A" });
            return user;
        } catch (error) {
            authToken.value = null;
            localStorage.removeItem('authToken');
            throw new Error('Impossible de récupérer les informations utilisateur.');
        }
    }

    async adminLogin(password: string): Promise<LoginResponse> {
        console.log('Admin login credentials being sent:', password);
        const response: LoginResponse = await API.post('auth/admin-login', { password });

        authToken.value = response.access_token;
        localStorage.setItem('authToken', response.access_token);
        const store = useAuthStore();
        store.setCurrentUser({ id: 3, name: 'Admin', role: UserRole.coach, avatar: '' });

        return response;
    }

    // =================================== DELETE ===================================
    logout(): void {
        authToken.value = null;
        currentUser.value = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        const store = useAuthStore();
        store.clearUser();
    }

    // =================================== GETTERS ===================================
    getCurrentUser(): UserInfo | null {
        return currentUser.value;
    }

    isAuthenticated(): boolean {
        return !!authToken.value && !!currentUser.value;
    }

    hasRole(role: UserInfo['type']): boolean {
        return currentUser.value?.type === role;
    }

    isAdmin(): boolean {
        return this.hasRole('ADMIN');
    }
}

// Instance singleton pour utilisation directe
const authInstance = new AuthComposable();

// Exports pour compatibilité avec l'ancien code
export const login = (credentials: LoginCredentials) => authInstance.login(credentials);
export const logout = () => authInstance.logout();
export const getCurrentUser = () => authInstance.getCurrentUser();
export const checkIsAuthenticated = () => authInstance.isAuthenticated();
export const hasRole = (role: UserInfo['type']) => authInstance.hasRole(role);
export const isAdmin = () => authInstance.isAdmin();

// Hook Vue composable
export const useAuth = () => {
    return {
        currentUser: computed(() => currentUser.value),
        isAuthenticated: computed(() => authInstance.isAuthenticated()),
        login: authInstance.login.bind(authInstance),
        adminLogin: authInstance.adminLogin.bind(authInstance),
        logout: authInstance.logout.bind(authInstance),
        getCurrentUser: authInstance.getCurrentUser.bind(authInstance),
        checkIsAuthenticated: authInstance.isAuthenticated.bind(authInstance),
        hasRole: authInstance.hasRole.bind(authInstance),
        isAdmin: authInstance.isAdmin.bind(authInstance),
    };
};
