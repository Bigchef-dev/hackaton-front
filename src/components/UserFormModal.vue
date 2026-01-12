<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
            class="bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
            <!-- Header -->
            <div class="px-8 py-6 border-b border-gray-700">
                <div class="flex items-center justify-between">
                    <h2 class="text-3xl font-bold text-white">User Information</h2>
                    <button @click="emit('close')" class="text-gray-400 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Form Content -->
            <form @submit.prevent="handleSubmit" class="flex-1 px-8 py-6 overflow-y-auto">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                    <!-- First Name -->
                    <div>
                        <label class="block text-gray-300 font-medium mb-2 text-sm">First Name</label>
                        <input v-model="formData.name" type="text" required
                            class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                            placeholder="John" />
                    </div>

                    <!-- Last Name -->
                    <div>
                        <label class="block text-gray-300 font-medium mb-2 text-sm">Last Name</label>
                        <input v-model="formData.lastName" type="text" required
                            class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                            placeholder="Doe" />
                    </div>

                    <!-- Birth Date -->
                    <div>
                        <label class="block text-gray-300 font-medium mb-2 text-sm">Birth Date</label>
                        <input v-model="formData.birthDate" type="date" required
                            class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm" />
                    </div>

                    <!-- Phone Number -->
                    <div>
                        <label class="block text-gray-300 font-medium mb-2 text-sm">Phone Number</label>
                        <input v-model="formData.phoneNumber" type="tel" required
                            class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                            placeholder="+33 6 12 34 56 78" />
                    </div>

                    <!-- Email -->
                    <div>
                        <label class="block text-gray-300 font-medium mb-2 text-sm">Email</label>
                        <input v-model="formData.email" type="email" required
                            class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                            placeholder="john.doe@example.com" />
                    </div>




                    <!-- Address (spans 2 columns)
                    <div class="md:col-span-1">
                        <label class="block text-gray-300 font-medium mb-2 text-sm">Address</label>
                        <input v-model="formData.adress" type="text" required
                            class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                            placeholder="123 Main Street, City, Country" />
                    </div> -->

                    <!-- Gender Selection -->
                    <div>
                        <label class="block text-gray-300 font-medium mb-2 text-sm">Gender</label>
                        <select v-model="formData.gender" required
                            class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm">
                            <option value="X">Other</option>
                            <option value="F">Male</option>
                            <option value="M">Female</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-gray-300 font-medium mb-2 text-sm">Role</label>

                        <select v-model="formData.type" required
                            class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm">
                            <option value="PRESIDENT">President</option>
                            <option value="COACH">Coach</option>
                            <option value="ATHLETE">Athlete</option>
                        </select>
                    </div>

                    <!-- club selection -->
                    <div v-if="formData.type !== 'ATHLETE' " >
                        <label class="block text-gray-300 font-medium mb-2 text-sm">Club</label>
                        <select v-model="formData.clubId" required
                            class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm">
                            <option value="" disabled>Select a club</option>
                            <option v-for="club in clubs" :key="club.id" :value="club.id">
                                {{ club.name }}
                            </option>
                        </select>
                    </div>
                    <!-- club selection -->
                    <div v-if="formData.type === 'COACH' || formData.type === 'ATHLETE' " >
                        <label class="block text-gray-300 font-medium mb-2 text-sm">Sport</label>
                        <select v-model="formData.sportIds" required
                            class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm">
                            <option value="" disabled>Select a sport</option>
                            <option v-for="sport in sports" :key="sport.id" :value="[sport.id]">
                                {{ sport.name }}
                            </option>
                        </select>
                    </div>
                    <div v-if="formData.type === 'ATHLETE' && formData.sportIds ">
                        <label class="block text-gray-300 font-medium mb-2 text-sm">League</label>
                        <select v-model="formData.clubId" required
                            class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm">
                            <option value="" disabled>Select a league</option>
                            <option v-for="league in sports[formData.sportIds[0] || 0]" :key="league" :value="league">
                                {{ league }}
                            </option>
                        </select>
                    </div>
                </div>
                <!-- Success Message -->
                <div v-if="submitted" class="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
                    <p class="text-green-400 font-medium text-sm">✓ Form Submitted Successfully!</p>
                </div>
            </form>

            <!-- Footer Buttons -->
            <div class="px-8 py-6 border-t border-gray-700 flex gap-4">
                <button type="button" @click="resetForm"
                    class="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300">
                    Reset
                </button>
                <button type="submit" @click="handleSubmit"
                    class="flex-1 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { UserRole, type Club, type CreatePresidentPayload, type CreateUserPayload, type CreateUserValue, type President, type Sport } from '../utils/types';




const props = defineProps<{
    clubs: Array<Club>;
    sports: Array<Sport>;
}>();

const roles = UserRole;


const formData = reactive<Partial<CreateUserValue>>({
    name: '',
    lastName: '',
    birthDate: '',
    phoneNumber: '',
    email: '',
    gender: 'X',
    password: 'adminpass',
    type: 'ATHLETE',
    clubId: undefined,
    sportIds: [],


});



const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'submit', formData: Partial<CreateUserValue>): void;
}>();


const submitted = ref(false);

const handleSubmit = () => {
    console.log('Form submitted:', formData);
    submitted.value = true;
    emit('submit', { ...formData });

    setTimeout(() => {
        submitted.value = false;
    }, 3000);
};

const resetForm = () => {
    formData.name = '';
    formData.lastName = '';
    formData.birthDate = '';
    formData.phoneNumber = '';
    formData.email = '';
    formData.gender = 'X';
    submitted.value = false;
};
</script>