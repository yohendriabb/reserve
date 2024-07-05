<template>
   <section
      class="items-center mt-3 mb-3 bg-no-repeat bg-[url('/src/assets/img/05.jpeg')] bg-gray-700 bg-blend-multiply">
      <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
         <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Atención médica especializada las 24 horas al dia</h1>
         <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">¡Reserva tu cita y da el
            primer paso a un corazón saludable!</p>
         <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="#"
               class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
               Get started

            </a>
            <a href="#"
               class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
               Saber más
            </a>
         </div>
      </div>
   </section>


   <article>
      <label class="text-4xl  font-bold ml-[50%]">Servicios</label>
      <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
         <div class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
            <div v-for="services in service" :key="services.id"
               class="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
               <img :src="services.get_thumbnails" :alt="service.title" class="w-full h-80">
               <div class="p-4 pt-2">
                  <div class="mb-8">

                     <a href="#" class="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 inline-block">{{
                        services.title }}</a>

                  </div>
                  <div class="flex items-center">
                     <div class="text-sm">
                        <a href="#" class="text-gray-900 font-semibold leading-none hover:text-indigo-600">Leer más</a>
                     </div>
                  </div>
               </div>
            </div>

         </div>

      </div>
   </article>


</template>

<script>
import axios from 'axios'

export default {
   name: 'HomePage',
   data() {
      return {
         service: []
      }
   },
   mounted() {
      this.getFeed()
   },
   methods: {
      getFeed() {
         axios.get('/api/reserves/services/')
            .then(response => {
               console.log('data', response.data)

               this.service = response.data
            })
            .catch(error => {
               console.log('error', error)
            })
      }
   }
}
</script>
