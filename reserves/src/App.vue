<script>

import { RouterLink, RouterView } from 'vue-router'

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Toast from './components/Toast.vue'

export default {
    components: {
        Navbar,
        Footer,
        Toast
    }
}

</script>

<template>

<Navbar />
<Toast/>

<Footer />
</template>
