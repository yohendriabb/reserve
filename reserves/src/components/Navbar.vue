<script>
import axios from 'axios'
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'


export default {
    setup() {
        const userStore = useUserStore()

        return {
            userStore,
            isVisible: false

        }
    },
    methods: {
        toggleVisibility() {
            console.log("funciona mas o menos")
            this.isVisible = !this.isVisible;
        }
    },

    beforeCreate() {
        this.userStore.initStore()

        const token = this.userStore.user.access

        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            axios.defaults.headers.common["Authorization"] = "";
        }
    },
}

</script>

<template>
    <nav class="border-gray-200 bg-cyan-400">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/logo.png" class="h-10 w-[120px]" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
            </RouterLink>
            <div class="flex items-center space-x-6 rtl:space-x-reverse">
                <a href="tel:5541251234" class="text-sm  text-gray-500 dark:text-white hover:underline">0257-2516170/
                    2512667</a>
                <RouterLink :to="{ 'name': 'login' }" v-if="!userStore.user.isAuthenticated"
                    class="text-sm bg-sky-500 rounded-full px-4 py-2 text-gray-950  hover:text-cyan-300 ">Ingresar
                </RouterLink>
                <RouterLink :to="{ 'name': 'logout' }" v-if="userStore.user.isAuthenticated"
                    class="text-sm bg-sky-500 rounded-full px-4 py-2 text-gray-950  hover:text-cyan-300 ">Salir
                </RouterLink>

                <div v-if="userStore?.user?.isAuthenticated">
                    <div v-if="userStore?.user?.id">
                        <RouterLink :to="{ name: 'profile', params: { 'id': userStore.user.id } }"
                            class="text-sm bg-sky-500 rounded-full px-4 py-2 text-gray-950  hover:text-cyan-300 ">Perfil
                        </RouterLink>
                    </div>
                </div>


                <RouterLink :to="{ 'name': 'signup' }" v-if="!userStore.user.isAuthenticated"
                    class="text-sm bg-sky-500 rounded-full px-4 py-2 text-gray-950  hover:text-cyan-300 ">Registrar
                </RouterLink>
            </div>




        </div>

    </nav>
    <nav class="bg-blue-500 dark:bg-gray-700">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">

            <div class="flex items-center">

                <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                    <li>
                        <RouterLink :to="{ 'name': 'home' }" class="text-gray-950 dark:text-white hover:underline"
                            aria-current="page">Inicio</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ 'name': 'about' }" class="text-gray-950 dark:text-white hover:underline">
                            Acerca
                            de</RouterLink>
                    </li>
                    <li>
                        <div v-if="userStore.user.isAuthenticated">
                            <RouterLink :to="{ 'name': 'doc' }" class="text-gray-900 dark:text-white hover:underline"
                                v-if="userStore.user.is_superuser">
                                Médico</RouterLink>
                        </div>
                    </li>
                    <li v-if="userStore.user.isAuthenticated">
                        <RouterLink :to="{ 'name': 'date' }" class="text-gray-900 dark:text-white hover:underline">
                            Cita</RouterLink>
                    </li>
                    <li v-if="userStore.user.isAuthenticated">
                        <RouterLink :to="{ 'name': 'services' }" class="text-gray-900 dark:text-white hover:underline">
                            Servicios</RouterLink>
                    </li>

                    <li v-if="userStore.user.isAuthenticated">
                        <RouterLink :to="{ 'name': 'date-list' }" class="text-gray-900 dark:text-white hover:underline">
                            Citas</RouterLink>
                    </li>

                    <li>
                        <RouterLink :to="{ 'name': 'users-list' }" class="text-gray-900 dark:text-white hover:underline"
                            v-if="userStore.user.isAuthenticated">
                            Lista de Usuarios</RouterLink>
                    </li>


                    <div class="flex justify-center items-center bg-gray-200 rounded-full">
                        <div class="relative">
                            
                            <div v-if="isVisible"
                                class="absolute mt-2 center w-48 bg-white rounded-md shadow-xl z-20 hover:bg-sky-400 ">
                                <li>
                                    <RouterLink :to="{ 'name': 'date-list' }"
                                        class="block px-4 text-sm capitalize text-gray-700 hover:bg-white">
                                        Citas</RouterLink>
                                </li>
                                <li>
                                    <RouterLink :to="{ 'name': 'date-list' }"
                                        class="block px-4 text-sm capitalize text-gray-700 hover:bg-white">
                                        Medico</RouterLink>
                                </li>
                                <li>
                                    <RouterLink :to="{ 'name': 'date-list' }"
                                        class="block px-4 text-sm capitalize text-gray-700 hover:bg-white">
                                        Lista Usuarios</RouterLink>
                                </li>
                                <li>
                                    <RouterLink :to="{ 'name': 'date-list' }"
                                        class="block px-4 text-sm capitalize text-gray-700 hover:bg-white">
                                        LIsta Citas</RouterLink>
                                </li>
                                <li>
                                    <RouterLink :to="{ 'name': 'date-list' }"
                                        class="block px-4 text-sm capitalize text-gray-700 hover:bg-white">
                                        Servicios</RouterLink>
                                </li>
                            </div>
                        </div>
                    </div>

                </ul>

            </div>

        </div>

    </nav>
    <RouterView />
</template>
