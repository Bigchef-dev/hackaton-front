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

                <div class="flex flex-wrap gap-3">
                    <button @click="addClub"
                        class="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg transition hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            class="bi bi-bank" viewBox="0 0 16 16">
                            <path
                                d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z" />
                        </svg>
                        <span class="hidden md:inline">Create New Club</span>

                    </button>

                    <button @click="openUserFormModal = true;"
                        class="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg transition hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            <path fill-rule="evenodd"
                                d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                        </svg>
                        <span class="hidden md:inline">Create New President</span>

                    </button>
                </div>
            </div>

            <!-- TOGGLES -->
            <div class="flex gap-3 mb-6">
                <button @click="showUsers = !showUsers"
                    class="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition">
                    {{ showUsers ? 'Hide Users' : 'Show Users' }}
                </button>

                <button @click="showClubs = !showClubs"
                    class="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition">
                    {{ showClubs ? 'Hide Clubs' : 'Show Clubs' }}
                </button>
            </div>

            <!-- MAIN LAYOUT -->
            <div class="flex flex-col md:flex-row gap-6 transition-all">

                <!-- USERS COLUMN -->
                <div v-if="showUsers" class="w-full md:w-1/2 bg-gray-900/40 rounded-2xl p-4 overflow-auto">

                    <h2 class="text-xl font-bold text-white mb-4">
                        Users
                    </h2>

                    <div class="space-y-4">
                        <div v-for="card in cards" :key="card.id" class="p-4 bg-gray-800 rounded-xl shadow">

                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                                <div class="font-medium">
                                    {{ card.name }} {{ card.lastName }}
                                    <span class="ml-2 text-xs text-gray-400">
                                        ({{ card.type }})
                                    </span>
                                </div>

                                <button class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                                    @click="validateDeleteUser(card.id)">
                                    Delete
                                </button>
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

                    <div class="space-y-4">
                        <div v-for="club in clubs" :key="club.id"
                            class="p-4 bg-gray-800 rounded-xl shadow text-white flex justify-between items-center">

                            <span class="font-medium">
                                {{ club.name }}
                            </span>

                            <button @click="deleteClub(club.id)"
                                class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="openUserFormModal">
                    <UserFormModal :clubs="clubs || []" @close="openUserFormModal = false" @submit="addUser" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Club, UserInfo } from '../utils/types';
import { UserComposable } from '../utils/composabes/user';
import { ClubComposable } from '../utils/composabes/club';
import UserFormModal from './UserFormModal.vue';

/* VISIBILITY */
const showUsers = ref(true);
const showClubs = ref(true);
const openUserFormModal = ref(false);

const UserController = new UserComposable();
const ClubController = new ClubComposable();

const cards = ref<UserInfo[]>();
const clubs = ref<Club[]>();


onMounted(async () => {
    cards.value = await UserController.getAllUsers();
    clubs.value = await ClubController.getAllClubs();
});

/* CLUBS */



/* ACTIONS */
function validateDeleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
        console.log('User deleted:', id);
    }
}

function addUser(userData: Partial<UserInfo>) {
    console.log(userData);
    
    if (userData.name) {
        // Convert birthDate from string to Date if provided
        if (userData.birthDate && typeof userData.birthDate === 'string') {
            userData.birthDate = new Date(userData.birthDate).toDateString();
        }

        UserController.createUser(userData as UserInfo)
            .then((newUser) => {
                cards.value?.push(newUser);
                alert(`User "${newUser.name} ${newUser.lastName}" created successfully!`);
            })
            .catch((error) => {
                alert(`Error creating user: ${error.message}`);
            });
    }
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