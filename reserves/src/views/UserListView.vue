<template>

    <div class="relative overflow-x-auto m-2">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>

                    <th scope="col" class="px-6 py-3">
                        E-mail
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Nombre
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Fecha de Nacimiento
                    </th>
                    <th scope="col" class="px-6 py-3">
                        fecha de registro
                       
                    </th>

                    <th scope="col" class="px-6 py-3">
                        Ultima Visita
                    </th>
                   
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" v-bind:key="user.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                    <td class="px-6 py-4">
                        {{ user.email }}
                    </td>
                    <td class="px-6 py-4">
                        {{ user.name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ user.age }}
                    </td>

                    <td class="px-6 py-4">
                        {{ user.date_joined }}
                    </td>
                    <td class="px-6 py-4">
                        {{ user.last_login }}
                    </td>
                  

                </tr>

            </tbody>
        </table>
    </div>

</template>

<script>
import axios from 'axios'
//userlist
export default {
    name: 'UsersListView',

    data() {
        return {
            users: []

        }
    },
    mounted() {
        this.getFeed()
    },
    methods: {
        getFeed() {
            axios.get('/api/userlist/')
                .then(response => {
                    console.log('data', response.data)
                    this.users = response.data
                })
                .catch(error => {
                    console.log('error', error)
                })
        }
    }
}

</script>