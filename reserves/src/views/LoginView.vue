<script>
import axios from 'axios'

import { useUserStore } from '@/stores/user'

export default {
    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },

    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            errors: []
        }
    },
    
    methods: {
        async submitForm() {
            this.errors = []

            if (this.form.email === '') {
                this.errors.push('Your e-mail is missing')
            }

            if (this.form.password === '') {
                this.errors.push('Your password is missing')
            }

            if (this.errors.length === 0) {
                await axios
                    .post('/api/login/', this.form)
                    .then(response => {
                        this.userStore.setToken(response.data)

                        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
                    })
                    .catch(error => {
                        console.log('error', error)

                        this.errors.push('The email or password is incorrect! Or the user is not activated!')
                    })
            }
            
            if (this.errors.length === 0) {
                await axios
                    .get('/api/me/')
                    .then(response => {
                        this.userStore.setUserInfo(response.data)

                        this.$router.push('/date')
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            }
        }
    }
}
</script>

<template>
  <main class="px-8 py-6 bg-gray-100">
    <main class="px-8 py-6 bg-gray-100">
      <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
  
        <div class="main-center col-span-2 space-y-4 md:w-auto">
          <div class="p-12 bg-white border border-gray-200 rounded-lg">
            <form class="space-y-6" v-on:submit.prevent="submitForm">
              <div>
                <label>E-mail</label><br>
                <input v-model="form.email" type="email" placeholder="Your e-mail address"
                  class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
              </div>

              <div>
                <label>Password</label><br>
                <input v-model="form.password" type="password" placeholder="Your password"
                  class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
              </div>
              <div v-if="errors.length > 0">
                <p class="bg-red-300 text-white rounded-lg p-6" v-for="error in errors" v-bind:key="error">
                  {{ error.lenght > 0 }}</p>

              </div>
              <div>
                <button class="py-4 px-6 bg-purple-600 text-white rounded-lg">Log in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </main>
</template>