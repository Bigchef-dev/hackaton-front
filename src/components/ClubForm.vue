<template>
    <div class="max-w-xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 class="text-2xl font-bold text-white mb-6">
            Create a Club
        </h2>

        <form @submit.prevent="submitForm" class="space-y-4">

            <!-- Club name -->
            <div>
                <label class="block text-gray-300 mb-1">Club name</label>
                <input
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="FC Future United" />
            </div>

            <!-- Sport -->
            <div>
                <label class="block text-gray-300 mb-1">Sport</label>
                <select
                    v-model="form.id_sport"
                    required
                    class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option disabled value="">Select a sport</option>
                    <option v-for="sport in sports" :key="sport.id" :value="sport.id">
                        {{ sport.name }}
                    </option>
                </select>
            </div>

            <!-- User -->
            <div>
                <label class="block text-gray-300 mb-1">User</label>
                <select
                    v-model="form.id_user"
                    required
                    class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option disabled value="">Select a user</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                        {{ user.name }} {{ user.lastName }}
                    </option>
                </select>
            </div>

            <!-- Submit -->
            <button
                type="submit"
                class="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition">
                Create Club
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Sport {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    lastName: string;
}

interface ClubCreate {
    name: string;
    id_sport: number | '';
    id_user: number | '';
}

const form = ref<ClubCreate>({
    name: '',
    id_sport: '',
    id_user: ''
});

// Mock data (à remplacer par API plus tard)
const sports = ref<Sport[]>([
    { id: 1, name: 'Football' },
    { id: 2, name: 'Basketball' },
    { id: 3, name: 'Tennis' }
]);

const users = ref<User[]>([
    { id: 1, name: 'John', lastName: 'Doe' },
    { id: 2, name: 'Jane', lastName: 'Smith' },
    { id: 3, name: 'Alice', lastName: 'Johnson' }
]);

function submitForm() {
    console.log('Club created:', form.value);

    // Exemple futur :
    // await api.post('/clubs', form.value)

    // Reset
    form.value = {
        name: '',
        id_sport: '',
        id_user: ''
    };
}
</script>
