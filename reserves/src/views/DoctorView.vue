<script>
import axios from 'axios'


export default {

  data() {
    return {
      doctors: []

    }
  },
  mounted() {
    this.getFeed()
  },
  methods: {
    getFeed() {
      axios.get('/api/reserves/doc-list/')
        .then(response => {
          console.log('data', response.data)
          this.doctors = response.data
        })
        .catch(error => {
          console.log('error', error)
        })
    }
  }
}

</script>


<template>



  <div  class="grid-cols-1 sm:grid md:grid-cols-4 ">
    <div v-for="doctor in doctors" v-bind="doctors.id"
      class="mx-3 mt-6 flex flex-col self-start rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white sm:shrink-0 sm:grow sm:basis-0">
      <a href="#!">
        <img class="rounded-t-lg" src="https://tecdn.b-cdn.net/img/new/standard/city/041.webp"
          alt="Hollywood Sign on The Hill" />
      </a>
      <div class="p-6">
        <h5 class="mb-2 text-xl font-medium leading-tight">{{doctor.name}}</h5>
        <div class=" flex justify-between items-center">
          <div v-for="specialties in doctor.specialty" class="mb-4 text-base items-center col-3 text-[15px]">
          <p  class="">{{specialties.name}}</p>
          <h3 class="text-justify">{{doctor.description}}</h3>
        </div>

        </div>
        
      </div>
    </div>
    
   
  </div>
</template>
