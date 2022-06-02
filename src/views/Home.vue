<template>
  <div class="home">
    <p v-if="loading">Loading...</p>
    <p v-if="error">Error...</p>
    <FilterMushrooms
      v-if="mushroomsLoaded"
      :sort="sortMushroms" :choices="colorChoices"
      :mushrooms="mushrooms" :type="'color'"/>
    <MapContainer v-if="mushroomsLoaded" :mushrooms="mushrooms" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MapContainer from '@/components/Map/MapContainer.vue'
import mushrooms, { Spots, Color } from '@/api/front-end api.ts'
import FilterMushrooms from '@/components/Map/FilterMushrooms.vue'

export default defineComponent({
  name: 'Home',
  components: {
    MapContainer,
    FilterMushrooms
  },
  data () {
    return {
      allMushrooms: [{}],
      mushrooms: [{}],
      mushroomsLoaded: false,
      error: false,
      loading: false,
      colorChoices: [
        { name: 'red', selected: false },
        { name: 'green', selected: false },
        { name: 'yellow', selected: false },
        { name: 'blue', selected: false }
      ],
      color: Color,
      spots: Spots
    }
  },
  mounted () {
    this.getMushrooms()
  },
  methods: {
    getMushrooms (): void {
      this.loading = true
      mushrooms().then((result) => {
        this.mushrooms = result
        this.allMushrooms = result
      })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.mushroomsLoaded = true
          this.loading = false
        })
    },
    sortMushroms (choice: string): void {
      const filteredMushrooms = this.allMushrooms.filter(
        (item: Record<string, Color>) => this.color[item.color].toLowerCase() === choice)
      this.mushrooms = filteredMushrooms
    }
  }
})
</script>
