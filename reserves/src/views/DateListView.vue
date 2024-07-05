<template>

    <div class="relative overflow-x-auto mt-3">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Nombre
                    </th>
                    <th scope="col" class="px-6 py-3">
                       Correo
                    </th>
                    <th scope="col" class="px-6 py-3">
                       Télefono
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Fecha de Cita
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="date in dates" v-bind:key="date.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ date.name }}
                    </th>
                    <td class="px-6 py-4">
                        {{ date.email }}
                    </td>
                    <td class="px-6 py-4">
                        {{ date.phone }}
                    </td>
                    <td class="px-6 py-4">
                        {{ date.date_at }}
                    </td>
                </tr>
               
               
            </tbody>
        </table>
    </div>

</template>


<script>
import axios from 'axios';
import { useUserStore } from '@/stores/user'




export default {
  setup() {
    const userStore = useUserStore()


    return {
      userStore,

    }
  },

  data() {
    return {
      dates: [],
     
     
    }
  },
  mounted() {
    this.getFeed()
  },
  methods: {
   
    getFeed() {
      axios.get('/api/reserves/date-list/')
        .then(response => {
          console.log('data', response.data)
          this.dates = response.data
        })
        .catch(error => {
          console.log('error', error)
        })
    }
  }
}

</script>
