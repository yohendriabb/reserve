<template>
    <h1>Salio del sistema</h1>
</template>


<script>
//removeToken
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
        this.userStore.removeToken()

        const token = this.userStore.user.access

        if (this.token === 0) {
            this.$router.push('/')
            }
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            axios.defaults.headers.common["Authorization"] = "";
        }
    },
}

</script>