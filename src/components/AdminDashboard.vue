<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 md:p-8">
        <div class="max-w-7xl mx-auto">

            <!-- HEADER -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                <div>
                    <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                        Admin Dashboard
                    </h1>
                    <p class="text-gray-400">
                        Welcome! Here you can manage users and clubs.
                    </p>
                </div>


            </div>


            <!-- MAIN LAYOUT -->
            <div class="flex flex-col md:flex-row gap-6 transition-all">

                <!-- USERS COLUMN -->
                <div class="w-full md:w-1/2 bg-gray-900/40 rounded-2xl p-4 overflow-auto">

                    <h2 class="text-xl font-bold text-white mb-4">
                        Users
                    </h2>

                    <ButtonAdd text="Add New User" @click="openUserFormModal = true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            <path fill-rule="evenodd"
                                d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                        </svg>
                    </ButtonAdd>

                    <div class="space-y-4">
                        <div v-for="card in cards" :key="card.id" class="p-4 bg-gray-800 rounded-xl shadow">

                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                                <div class="font-medium">
                                    {{ card.name }} {{ card.lastName }}
                                    <span class="ml-2 text-xs text-gray-400">
                                        ({{ card.type }})
                                    </span>
                                </div>

                                <GenericButton text="Delete" @click="validateDeleteUser(card.id)" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CLUBS COLUMN -->
                <div v-if="showClubs" class="w-full md:w-1/2 bg-gray-900/40 rounded-2xl p-4
           md:max-h-[calc(100vh-260px)] md:overflow-y-auto custom-scroll">




                    <h2 class="text-xl font-bold text-white mb-4">
                        Clubs
                    </h2>

                    <ButtonAdd text="Add New Club" @click="addClub">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-building-fill-add" viewBox="0 0 16 16">
                            <path
                                d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0" />
                            <path
                                d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.256A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-3.59 1.787A.5.5 0 0 0 9 9.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .39-.187A4.5 4.5 0 0 0 8.027 12H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                        </svg>
                    </ButtonAdd>

                    <div class="space-y-4">
                        <div v-for="club in clubs" :key="club.id"
                            class="p-4 bg-gray-800 rounded-xl shadow text-white flex justify-between items-center">

                            <span class="font-medium">
                                {{ club.name }}
                            </span>

                            <GenericButton text="Delete" @click="deleteClub(club.id)" />
                        </div>
                    </div>
                </div>


                <div class="w-full md:w-1/2 bg-gray-900/40 rounded-2xl p-4 overflow-auto">

                    <h2 class="text-xl font-bold text-white mb-4">
                        Sports
                    </h2>

                    <ButtonAdd text="Add New Sport" @click="addSport">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-dribbble" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8m5.284 3.688a6.8 6.8 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.81-2.69zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A7 7 0 0 1 8 1.18m-2.907.642A43 43 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.87 6.87 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.01 3.61.053 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.82 6.82 0 0 1-1.752-4.564zM8 14.837a6.8 6.8 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.3 28.3 0 0 1 1.457 5.18A6.7 6.7 0 0 1 8 14.837m3.81-1.171c-.07-.417-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.77 6.77 0 0 1-2.924 4.573z" />
                        </svg>
                    </ButtonAdd>
                    <div class="space-y-4">
                        <div v-for="sport in sports" :key="sport.id" class="p-4 bg-gray-800 rounded-xl shadow">

                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                                <div class="font-medium">
                                    {{ sport.name }}

                                </div>
                                <GenericButton text="Delete" @click="deleteSport(sport.id)" />
                            </div>
                        </div>
                    </div>
                </div>


                <div v-if="openUserFormModal">
                    <UserFormModal :sports="sports || []" :clubs="clubs || []" @close="openUserFormModal = false"
                        @submit="addUser" />
                </div>
            </div>
        </div>

        <!-- Admin Login Modal -->
        <div v-if="showAdminModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                <h2 class="text-2xl font-bold text-white mb-4">Admin Login</h2>

                <div v-if="adminError"
                    class="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4">
                    {{ adminError }}
                </div>

                <form @submit.prevent="handleAdminLogin" class="space-y-4">
                    <div>
                        <label for="adminPassword" class="block text-gray-300 mb-2 font-semibold">Mot de passe
                            Admin</label>
                        <input id="adminPassword" v-model="adminPassword" type="password" placeholder="••••••••"
                            class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                            required />
                    </div>

                    <div class="flex gap-3">
                        <button type="submit" :disabled="isAdminLoading"
                            class="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50">
                            {{ isAdminLoading ? 'Connexion...' : 'Confirmer' }}
                        </button>
                        <button type="button" @click="closeAdminModal"
                            class="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Athlete, Club, Coach, CreateAthletePayload, CreateCoachPayload, CreatePresidentPayload, CreateUserValue, President, Sport, UserInfo } from '../utils/types';
import UserFormModal from './UserFormModal.vue';
import ButtonAdd from './ButtonAdd.vue';
import GenericButton from './GenericButton.vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../utils/composables/auth';
import { ClubComposable } from '../utils/composables/club';
import { UserComposable } from '../utils/composables/user';
import { SportComposable } from '../utils/composables/sport';

const router = useRouter();
const { currentUser, logout, adminLogin } = useAuth();

// Admin login modal state
const showAdminModal = ref(false);
const adminPassword = ref('');
const adminError = ref('');
const isAdminLoading = ref(false);

/* VISIBILITY */
const showUsers = ref(true);
const showClubs = ref(true);
const openUserFormModal = ref(false);

const UserController = new UserComposable();
const ClubController = new ClubComposable();
const SportController = new SportComposable();

const cards = ref<UserInfo[]>();
const clubs = ref<Club[]>();
const sports = ref<Sport[]>();


onMounted(async () => {
    cards.value = await UserController.getAllUsers();
    clubs.value = await ClubController.getAllClubs();
    sports.value = await SportController.getAllSports();

    console.log(cards);
    console.log(clubs);
    console.log(sports);


});

const handleLogout = () => {
    logout();
    router.push('/login');
};

const handleAdminLogin = async () => {
    adminError.value = '';
    isAdminLoading.value = true;

    try {
        await adminLogin(adminPassword.value);
        closeAdminModal();
    } catch (error) {
        adminError.value = error instanceof Error ? error.message : 'Échec de l\'authentification admin.';
    } finally {
        isAdminLoading.value = false;
    }
};

const closeAdminModal = () => {
    showAdminModal.value = false;
    adminPassword.value = '';
    adminError.value = '';
};
// Icon components (simplified SVG)
const Users = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
};

/* CLUBS */



/* ACTIONS */
function validateDeleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
        console.log('User deleted:', id);
        UserController.deleteUser(id)
            .then(() => {
                cards.value = cards.value?.filter(user => user.id !== id);
                alert('User deleted successfully!');
            })
            .catch((error) => {
                alert(`Error deleting user: ${error.message}`);
            });
    }
}


function addUser(userData: Partial<CreateUserValue>): Promise<President | Athlete | Coach> {
    if (userData.name) {
        switch (userData.type) {
            case 'PRESIDENT':
                const data = { name: userData.name, lastName: userData.lastName, email: userData.email, password: userData.password, gender: userData.gender, clubId: userData.clubId, birthDate: userData.birthDate };
                addPresident(data as Partial<CreatePresidentPayload>);
                break;
            case 'ATHLETE':
                const athleteData = { name: userData.name, birthDate: userData.birthDate, lastName: userData.lastName, email: userData.email, password: userData.password, gender: userData.gender, sportIds: userData.sportIds  };
                addAthlete(athleteData as Partial<CreateAthletePayload>);
                break;
            case 'COACH':
                const coachData = { name: userData.name, birthDate: userData.birthDate, lastName: userData.lastName, email: userData.email, password: userData.password, gender: userData.gender, clubId: userData.clubId, sportIds: userData.sportIds || [] };
                addCoach(coachData as Partial<CreateCoachPayload>);
                break;
            default:
                throw new Error('Invalid user role');
        }
    }
    throw new Error('Invalid user data');
}


function addPresident(userData: Partial<CreatePresidentPayload>): Promise<President> {
    if (userData.name) {
        UserController.createPresident(userData as Partial<CreatePresidentPayload>)
            .then((newUser) => {
                cards.value?.push(newUser
                );
                alert(`User "${newUser.name} ${newUser.lastName}" created successfully!`);
                return newUser;
            })
            .catch((error) => {
                alert(`Error creating user: ${error.message}`);
                throw error;
            });
    }
    throw new Error('Invalid user data');
}

function addAthlete(userData: Partial<CreateAthletePayload>): Promise<Athlete> {
    if (userData.name) {
        UserController.createAthlete(userData as Partial<CreateAthletePayload>)
            .then((newUser) => {
                cards.value?.push(newUser
                );
                alert(`User "${newUser.name} ${newUser.lastName}" created successfully!`);
                return newUser;
            })
            .catch((error) => {
                alert(`Error creating user: ${error.message}`);
                throw error;
            });
    }
    throw new Error('Invalid user data');

    // Implementation for adding an athlete
}

function addCoach(userData: Partial<CreateCoachPayload>): Promise<Coach> {
    if (userData.name) {
        UserController.createCoach(userData as Partial<CreateCoachPayload>)
            .then((newUser) => {
                cards.value?.push(newUser
                );
                alert(`User "${newUser.name} ${newUser.lastName}" created successfully!`);
                return newUser;
            })
            .catch((error) => {
                alert(`Error creating user: ${error.message}`);
                throw error;
            });
    }
    throw new Error('Invalid user data');

    // Implementation for adding a coach
}


function addClub() {
    const clubName = window.prompt('Enter the name of the new club:');
    if (clubName) {
        ClubController.createClub({ name: clubName })
            .then((newClub) => {
                clubs.value?.push(newClub);
                alert(`Club "${newClub.name}" created successfully!`);
            })
            .catch((error) => {
                alert(`Error creating club: ${error.message}`);
            });
    }
}

async function addSport() {
    const sportName = window.prompt('Enter the name of the new sport:');
    if (sportName) {
        SportController.createSport({ name: sportName })
            .then((newSport) => {
                alert(`Sport "${newSport.name}" created successfully!`);
            })
            .catch((error) => {
                alert(`Error creating sport: ${error.message}`);
            });
        sports.value = await SportController.getAllSports();
    }
}

function deleteClub(id: number) {
    const confirmed = confirm('Are you sure you want to delete this club?');
    if (!confirmed) return;
    ClubController.deleteClub(id)
        .then(() => {
            clubs.value = clubs.value?.filter(club => club.id !== id);
            alert('Club deleted successfully!');
        })
        .catch((error) => {
            alert(`Error deleting club: ${error.message}`);
        });
}

function deleteSport(id: number) {
    const confirmed = confirm('Are you sure you want to delete this sport?');
    if (!confirmed) return;
    if (id) {
        SportController.deleteSport(id)
            .then(() => {
                sports.value = sports.value?.filter(sport => sport.id !== id);
                alert('Sport deleted successfully!');
            })
            .catch((error) => {
                alert(`Error deleting sport: ${error.message}`);
            });
    }
}
</script>


<style scoped>
.custom-scroll {
    scrollbar-width: thin;
    scrollbar-color: #6366f1 transparent;
}

.custom-scroll::-webkit-scrollbar {
    width: 8px;
}

.custom-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scroll::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #6366f1, #8b5cf6);
    border-radius: 999px;
}
</style>