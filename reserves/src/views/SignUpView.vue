<template>
    <div class="px-8 py-6 bg-gray-100">
      <main class="px-8 py-6 bg-gray-100">
        <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
            
          <div class="main-center col-span-2 ml-40 space-y-4">
            <div class="p-12 bg-blue-400 border border-gray-200 rounded-lg">
              <form enctype="multipart/form-data" class="space-y-6" v-on:submit.prevent="submitForm">
                <div>
                  <label>Name</label><br>
                  <input v-model="form.name" type="text" placeholder="Enter your lastname"
                    class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                </div>
                <div>
                  <label>E-mail</label><br>
                  <input v-model="form.email" type="email" placeholder="Your e-mail address"
                    class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                </div>
                <div>
                  <label>Edad</label><br>
                  <input v-model="form.age" type="date" placeholder="Your e-mail address"
                    class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                </div>
                <div>
                  <label>Imagen</label><br>
                  <input ref="avatar" type="file" placeholder="Your e-mail address"
                    class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                </div>
  
                <div>
                  <label>Password</label><br>
                  <input v-model="form.password1" type="password" placeholder="Your password"
                    class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                </div>
                <div>
                  <label>Confirm Password</label><br>
                  <input v-model="form.password2" type="password" placeholder="Confirm your password"
                    class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                    
                    <div v-if="errors.length > 0">
                      <p class="bg-red-300 text-white rounded-lg p-6"  v-for="error in errors" v-bind:key="error" >{{error}}</p>
                     
                    </div>

                                

                </div>
  
                <div>
                  <button type="submit" class="py-4 px-6 bg-purple-600 text-white rounded-lg">Log in</button>
                </div>
              </form>
              
            </div>
          </div>
        </div>
        
      </main>
    </div>
    <Toast/>
  </template>

<script>
import axios from 'axios'
import Toast from '@/components/Toast.vue'

import { useToastStore } from '@/stores/toast'

export default {
    setup() {
        const toastStore = useToastStore()
        
        return {
            toastStore,
            FormData
        }
    },
    components: {
      Toast,
    },
  
    data() {
        return {
            form: {
                email: '',
                name: '',
                age:'',
                avatar: null,
                password1: '',
                password2: '',
            },
            errors: [],
            activate: null
            
        }
    },

    methods: {
        submitForm() {
            this.errors = []

            if (this.form.email === '') {
                this.errors.push('Engrese un correo valido')
            }

            if (this.form.name === '') {
                this.errors.push('Ingrese un nombre y apellido valido')
            }

            if (this.form.password1 === '') {
                this.errors.push('Ingrese una contraseña valida')
            }

            if (this.form.password1 !== this.form.password2) {
                this.errors.push('Las contraseñas deben coincidir')
            }
            if (this.form.edad > 99 ) {
                this.errors.push('debe ingresar un numero valido')
            }

      
            if (this.errors.length === 0) {
              let formData = new FormData()
              formData.append('name', this.form.name)
              formData.append('name', this.form.name)
              formData.append('avatar', this.$refs.avatar.files[0])
                axios
                    .post('/api/signup/', this.form)
                    .then(response => {
                        if (response.data.message === 'success') {
                            this.toastStore.showToast(5000, 'Usuario Registrado!!', 'bg-emerald-500')

                            this.form.email = ''
                            this.form.name = ''
                            this.form.age = ''
                            this.form.password1 = ''
                            this.form.password2 = ''
                           
                            this.form.avatar = this.$refs.avatar.files.item(0)
                            
                        } else {
                            const data = JSON.parse(response.data.message)
                            for (const key in data){
                                this.errors.push(data[key][0].message)
                            }

                            this.toastStore.showToast(5000, 'Something went wrong. Please try again', 'bg-red-300')
                        }
                    })
                    .catch(error => {
                        console.log('error', error)
                        this.errors.push('error con el servidor')
                    })
            }
        },
        
    }
}
</script>