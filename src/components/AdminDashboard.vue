<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="flex items-center justify-between mb-12">
                <div>
                    <h1 class="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                    <p class="text-gray-400">Welcome! Here you can manage users and settings.</p>
                </div>
                <button @click=""
                    class="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Card
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="card in cards" :key="card.id" class="p-4 bg-gray-800 rounded-2xl shadow-lg shadow-black/30">

                    <div class="text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div class="text-lg font-medium">
                            {{ card.name }} {{ card.lastName }}
                        </div>

                        <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <!-- <button
                                class="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition" @click="openModalUserInfo(card)">
                                See Details
                            </button> -->

                            <button
                                class="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
                                @click="validateDeleteUser(card.id)">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <!-- <div v-if="seeUserDetails">
                <UserInfoModal :user="selectedCard" @close="seeUserDetails = false" />
            </div> -->


            <!-- Cards Grid
            <div class="grid grid-cols-1 sm:grid-cols-3 ">
                <div v-for="card in cards" :key="card.id">
                    <UserCard :user="card" />
                </div>
            </div> -->

            <!-- Recent Activity -->

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserCard from './reusable/UserCard.vue';
import type { UserInfo } from '../utils/types';
import { validateLocaleAndSetLanguage } from 'typescript';
import UserInfoModal from './UserInfoModal.vue';

const seeUserDetails = ref(false);
const selectedCard = ref<UserInfo>({
    id: 0,
    name: '',
    lastName: '',
    birthDate: new Date(),
    phoneNumber: '',
    adress: '',
    email: '',
    gender: 'X',
    type: 'ATHLETE'
});
// Icon components (simplified SVG)
const Users = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
};

const DollarSign = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
};

const TrendingUp = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>`
};

const Settings = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
};

const Bell = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>`
};



const cards = ref<UserInfo[]>([
    {
        id: 1,
        name: 'John',
        lastName: 'Doe',
        birthDate: new Date('1990-01-01'),
        phoneNumber: '123-456-7890',
        adress: '123 Main St, Anytown, USA',
        email: 'john.doe@example.com',
        gender: "M",
        type: "ATHLETE"
    },
    {
        id: 2,
        name: 'Jane',
        lastName: 'Smith',
        birthDate: new Date('1985-05-15'),
        phoneNumber: '987-654-3210',
        adress: '456 Elm St, Othertown, USA',
        email: 'jane.smith@example.com',
        gender: "F",
        type: "COACH"
    },
    {
        id: 3,
        name: 'Alice',
        lastName: 'Johnson',
        birthDate: new Date('1992-09-23'),
        phoneNumber: '555-123-4567',
        adress: '789 Oak St, Sometown, USA',
        email: 'alice.johnson@example.com',
        gender: "F",
        type: "PRESIDENT"
    },
    {
        id: 4,
        name: 'Bob',
        lastName: 'Brown',
        birthDate: new Date('1988-12-11'),
        phoneNumber: '444-555-6666',
        adress: '321 Pine St, Anycity, USA',
        email: 'bob.brown@example.com',
        gender: "M",
        type: "ADMIN"
    }

]);

function validateDeleteUser(id: number) {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
        console.log("UserDeleted:", id);

    }
}

function openModalUserInfo(card: UserInfo) {
    selectedCard.value = card;
    seeUserDetails.value = true;
}




</script>