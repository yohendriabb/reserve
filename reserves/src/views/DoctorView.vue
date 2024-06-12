<script>
import axios from 'axios'


export default {
    
    data() {
        return {
            doc: []

        }
    },
    mounted() {
        this.getFeed()
    },
    methods:  {
        getFeed() {
            axios.get('/doc-list/')
            .then(response => {
                console.log('data', response.data)
                this.doc = response.data
            })
            .catch(error => {
                console.log('error', error)
            })
        }
    }
}

</script>

<template>
    <section class="text-gray-700 body-font" id="gallery" v-for="doctor in doc">
        <div class="flex justify-center text-3xl font-bold text-gray-800 text-center py-10">
            {{doctor}}
        </div>

        <div class="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

            <div class="group relative">
                <img src="../assets/img/02.jpeg" alt="Image 1"
                    class="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105" />
            </div>

            <div class="group relative">
                <img src="../assets/img/03.jpeg" alt="Image 1"
                    class="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105" />
            </div>

            <div class="group relative">
                <img src="../assets/img/04.jpeg" alt="Image 1"
                    class="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105" />
                <p
                    class="text-bg-gray-600 text-[20px] transition-transform transform scale-100 group-hover:scale-105 group-hover:mt-1">
                    Abierta las 24 horas</p>
            </div>
            <div class="group relative">
                <img src="../assets/img/05.jpeg" alt="Image 1"
                    class="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105" />
            </div>



            <!-- Repeat this div for each image -->
        </div>

    </section>

</template>
