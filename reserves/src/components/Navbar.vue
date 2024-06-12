<script>
import axios from 'axios'
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'


export default {
   setup() {
    const userStore = useUserStore()
    

    return {
        userStore,
       
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
    <nav class="border-gray-200 bg-cyan-500">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/src/assets/img/06.jpeg" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Sucardio</span>
            </RouterLink>
            <div class="flex items-center space-x-6 rtl:space-x-reverse">
                <a href="tel:5541251234" class="text-sm  text-gray-500 dark:text-white hover:underline">0257-2516170/
                    2512667</a>
                <RouterLink :to="{ 'name': 'login' }" v-if="!userStore.user.isAuthenticated"
                    class="text-sm bg-cyan-400 rounded-full px-4 py-2 text-gray-950  hover:text-cyan-300 ">Ingresar
                </RouterLink>
                <RouterLink :to="{ 'name': 'logout' }" v-if="userStore.user.isAuthenticated"
                    class="text-sm bg-cyan-400 rounded-full px-4 py-2 text-gray-950  hover:text-cyan-300 ">Salir
                </RouterLink>
                <RouterLink :to="{ 'name': 'signup' }"
                    class="text-sm bg-cyan-400 rounded-full px-4 py-2 text-gray-950  hover:text-cyan-300 ">Registrar
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
                        <RouterLink :to="{ 'name': 'home' }" class="text-gray-950 dark:text-white hover:underline">Acerca
                            de</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ 'name': 'doc' }" class="text-gray-900 dark:text-white hover:underline" 
                        v-if="userStore.user.isAuthenticated">
                        Médico</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ 'name': 'feed' }" class="text-gray-900 dark:text-white hover:underline" 
                        v-if="userStore.user.isAuthenticated">
                            Reservas</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ 'name': 'users-list' }" class="text-gray-900 dark:text-white hover:underline" 
                        v-if="userStore.user.isAuthenticated">
                            Lista de Usuarios</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <RouterView />
</template>