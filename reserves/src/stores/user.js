import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore({
    id: 'user',

    state: () => ({
        user: {
            isAuthenticated: false,
            id: null,
            name: null,
            age: null,
            email: null,
            avatar: null,
            access: null,
            refresh: null,
            is_superuser: false,
            is_active: false,
            is_staff: false,
            is_doctor: false
           

        }
    }),

    actions: {
        initStore() {
            console.log('initStore', localStorage.getItem('user.access'))

            if (localStorage.getItem('user.access')) {
                console.log('User has access!')

                this.user.access = localStorage.getItem('user.access')
                this.user.refresh = localStorage.getItem('user.refresh')
                this.user.id = localStorage.getItem('user.id')
                this.user.name = localStorage.getItem('user.name')
                this.user.age = localStorage.getItem('user.age')
                this.user.email = localStorage.getItem('user.email')
                this.user.avatar = localStorage.getItem('user.avatar')
                this.user.is_superuser = localStorage.getItem('user.is_superuser')
                this.user.is_active = localStorage.getItem('user.is_active')
                this.user.is_staff = localStorage.getItem('user.is_staff')
                this.user.is_doctor = localStorage.getItem('user.is_doctor')
                this.user.isAuthenticated = true

                this.refreshToken()

                console.log('Initialized user:', this.user)
            }
        },

        setToken(data) {
            console.log('setToken', data)

            this.user.access = data.access
            this.user.id = data.id
            this.user.refresh = data.refresh
            this.user.isAuthenticated = true
            this.user.is_superuser = true
            this.user.is_active = true
            this.user.is_staff = true
            this.user.is_doctor = true
            this.user.avatar = null

            localStorage.setItem('user.access', data.access)
            localStorage.setItem('user.refresh', data.refresh)

            console.log('user.access: ', localStorage.getItem('user.access'))
        }, 

        removeToken() {
            console.log('removeToken')

            this.user.refresh = null
            this.user.access = null
            this.user.isAuthenticated = false
            this.user.id = null
            this.user.name = null
            this.user.age = null
            this.user.email = null
            this.user.avatar = null
            this.user.is_superuser = false
            this.user.is_active = false
            this.user.is_staff = false
            this.user.is_doctor = false
            

            localStorage.setItem('user.access', '')
            localStorage.setItem('user.refresh', '')
            localStorage.setItem('user.id', '')
            localStorage.setItem('user.name', '')
            localStorage.setItem('user.age', '')
            localStorage.setItem('user.avatar', '')
            localStorage.setItem('user.is_superuser', '')
            localStorage.setItem('user.is_active', '')
            localStorage.setItem('user.is_staff', '')
            localStorage.setItem('user.is_doctor', '')
            localStorage.setItem('user.email', '')
        
        },

        setUserInfo(user) {
            console.log('setUserInfo', user)

            this.user.id = user.id
            this.user.name = user.name
            this.user.age = user.age
            this.user.email = user.email
            this.user.avatar = user.avatar
            this.user.is_superuser = user.is_superuser
            this.user.is_active = user.is_active
            this.user.is_staff = user.is_staff
            this.user.is_doctor = user.is_doctor
            

            localStorage.setItem('user.id', this.user.id)
            localStorage.setItem('user.name', this.user.name)
            localStorage.setItem('user.age', this.user.age)
            localStorage.setItem('user.email', this.user.email)
            localStorage.setItem('user.avatar', this.user.avatar)
            localStorage.setItem('user.is_superuser', this.user.is_superuser)
            localStorage.setItem('user.is_active', this.user.is_active)
            localStorage.setItem('user.is_staff', this.user.is_staff)
            localStorage.setItem('user.is_doctor', this.user.is_doctor)

            console.log('User', this.user)
        },

        refreshToken() {
            axios.post('/api/refresh/', {
                refresh: this.user.refresh
            })
                .then((response) => {
                    this.user.access = response.data.access

                    localStorage.setItem('user.access', response.data.access)

                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
                })
                .catch((error)=>{
                    console.log(error)

                    this.removeToken()
                })
        },
    }
})