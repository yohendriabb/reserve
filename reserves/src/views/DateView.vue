<template>


  <div class="w-full max-w-xs ml-[30%] pt-5">
    <Toast />
    <form v-on:submit.prevent="createPost" class="bg-blue-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Correo
        </label>
        <input v-model="form.email"
          class="shadow appearance-none border hover:border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email" type="email" placeholder="Correo">
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          name
        </label>
        <input v-model="form.name"
          class=" shadow appearance-none border hover:border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="name" type="text" placeholder="Ingrese un email válido">

      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Télefono
        </label>
        <input v-model="form.phone"
          class=" shadow appearance-none border hover:border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="phone" type="number" placeholder="Ingrese un télefono válido">

      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Fecha
        </label>
        <input v-model="form.date_at"
          class=" shadow appearance-none border hover:border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="date_at" type="date">

      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          type="submit">
          Registrar
        </button>

      </div>
    </form>
    <div>
      <div v-if="errors.length > 0">
        <p class="bg-red-300 text-white rounded-lg p-6" v-for="error in errors" v-bind:key="error">{{ error }}</p>

      </div>

    </div>
  </div>




</template>



<script>
import axios from 'axios';
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast'
import Toast from '@/components/Toast.vue'



export default {
  components: {
    Toast,
  },
  setup() {
    const userStore = useUserStore()
    const toastStore = useToastStore()


    return {
      userStore,
      toastStore,

    }
  },

  data() {
    return {
      dates: [],
      form: {
        created_by: '',
        email: '',
        name: '',
        phone: '',
        date_at: ''
      },
      errors: []
    }
  },
  mounted() {
    this.getFeed()
  },
  methods: {
    async createPost() {
      console.log('form', this.form)
      axios.post('/api/reserves/date-create/', this.form)
        .then(response => {
          console.log('data', response.data.form)
          this.toastStore.showToast(5000, 'Cita Creada!!', 'bg-emerald-500')

        })
        .catch((error) => {
          console.error(error);
        });
    },
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