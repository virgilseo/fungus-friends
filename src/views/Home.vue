<template>
  <div class="home">
    <p v-if="loading">Loading...</p>
    <p v-if="error">Error...</p>
    <MapContainer v-if="mushroomsLoaded" :mushrooms="mushrooms"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MapContainer from '@/components/Map/MapContainer.vue'
import mushrooms from '@/api/front-end api.ts'

export default defineComponent({
  name: 'Home',
  components: {
    MapContainer
  },
  data () {
    return {
      mushrooms: [{}],
      mushroomsLoaded: false,
      error: false,
      loading: false
    }
  },
  mounted () {
    this.getMushrooms()
  },
  methods: {
    getMushrooms (): void {
      try {
        this.loading = true
        mushrooms().then((result) => {
          this.mushrooms = result
        })
      } catch (error) {
        console.log(error)
        this.error = true
      } finally {
        mushrooms().then(() => {
          this.mushroomsLoaded = true
          this.loading = false
        })
      }
    }
  }
})
</script>
